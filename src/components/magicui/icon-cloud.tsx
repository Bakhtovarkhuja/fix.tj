'use client'

import React, { useEffect, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'

interface Icon {
	x: number
	y: number
	z: number
	scale: number
	opacity: number
	id: number
}

interface IconCloudProps {
	icons?: React.ReactNode[]
	images?: string[]
}

function easeOutCubic(t: number): number {
	return 1 - Math.pow(1 - t, 3)
}

const ICON_SIZE = 54
const ICON_RADIUS = ICON_SIZE / 2

export function IconCloud({ icons, images }: IconCloudProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [iconPositions, setIconPositions] = useState<Icon[]>([])
	const [isDragging, setIsDragging] = useState(false)
	const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
	const [targetRotation, setTargetRotation] = useState<{
		x: number
		y: number
		startX: number
		startY: number
		distance: number
		startTime: number
		duration: number
	} | null>(null)
	const animationFrameRef = useRef<number>(0)
	const rotationRef = useRef({ x: 0, y: 0 })
	const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
	const imagesLoadedRef = useRef<boolean[]>([])

	useEffect(() => {
		if (!icons && !images) return

		const items = icons || images || []
		imagesLoadedRef.current = new Array(items.length).fill(false)

		const newIconCanvases = items.map((item, index) => {
			const offscreen = document.createElement('canvas')
			offscreen.width = ICON_SIZE
			offscreen.height = ICON_SIZE
			const offCtx = offscreen.getContext('2d')

			if (offCtx) {
				if (images) {
					const img = new Image()
					img.crossOrigin = 'anonymous'
					img.src = items[index] as string
					img.onload = () => {
						offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
						offCtx.beginPath()
						offCtx.arc(ICON_RADIUS, ICON_RADIUS, ICON_RADIUS, 0, Math.PI * 2)
						offCtx.closePath()
						offCtx.clip()
						offCtx.drawImage(img, 0, 0, ICON_SIZE, ICON_SIZE)
						imagesLoadedRef.current[index] = true
					}
				} else {
					offCtx.scale(0.6, 0.6)
					const svgString = renderToString(item as React.ReactElement)
					const img = new Image()
					img.src = 'data:image/svg+xml;base64,' + btoa(svgString)
					img.onload = () => {
						offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
						offCtx.drawImage(img, 0, 0)
						imagesLoadedRef.current[index] = true
					}
				}
			}

			return offscreen
		})

		iconCanvasesRef.current = newIconCanvases
	}, [icons, images])

	useEffect(() => {
		const items = icons || images || []
		const newIcons: Icon[] = []
		const numIcons = items.length || 20

		const offset = 2 / numIcons
		const increment = Math.PI * (3 - Math.sqrt(5))

		const SPHERE_RADIUS = 160

		for (let i = 0; i < numIcons; i++) {
			const y = i * offset - 1 + offset / 2
			const r = Math.sqrt(1 - y * y)
			const phi = i * increment

			const x = Math.cos(phi) * r
			const z = Math.sin(phi) * r

			newIcons.push({
				x: x * SPHERE_RADIUS,
				y: y * SPHERE_RADIUS,
				z: z * SPHERE_RADIUS,
				scale: 1,
				opacity: 1,
				id: i,
			})
		}

		setIconPositions(newIcons)
	}, [icons, images])

	const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = canvasRef.current?.getBoundingClientRect()
		if (!rect || !canvasRef.current) return

		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const ctx = canvasRef.current.getContext('2d')
		if (!ctx) return

		iconPositions.forEach(icon => {
			const cosX = Math.cos(rotationRef.current.x)
			const sinX = Math.sin(rotationRef.current.x)
			const cosY = Math.cos(rotationRef.current.y)
			const sinY = Math.sin(rotationRef.current.y)

			const rotatedX = icon.x * cosY - icon.z * sinY
			const rotatedZ = icon.x * sinY + icon.z * cosY
			const rotatedY = icon.y * cosX + rotatedZ * sinX

			const screenX = canvasRef.current!.width / 2 + rotatedX
			const screenY = canvasRef.current!.height / 2 + rotatedY

			const scale = (rotatedZ + 200) / 300
			const radius = ICON_RADIUS * scale
			const dx = x - screenX
			const dy = y - screenY

			if (dx * dx + dy * dy < radius * radius) {
				const targetX = -Math.atan2(
					icon.y,
					Math.sqrt(icon.x * icon.x + icon.z * icon.z)
				)
				const targetY = Math.atan2(icon.x, icon.z)

				const currentX = rotationRef.current.x
				const currentY = rotationRef.current.y
				const distance = Math.sqrt(
					Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
				)
				const duration = Math.min(2000, Math.max(800, distance * 1000))

				setTargetRotation({
					x: targetX,
					y: targetY,
					startX: currentX,
					startY: currentY,
					distance,
					startTime: performance.now(),
					duration,
				})
				return
			}
		})

		setIsDragging(true)
		setLastMousePos({ x: e.clientX, y: e.clientY })
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = canvasRef.current?.getBoundingClientRect()
		if (rect) {
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			setMousePos({ x, y })
		}

		if (isDragging) {
			const deltaX = e.clientX - lastMousePos.x
			const deltaY = e.clientY - lastMousePos.y

			rotationRef.current = {
				x: rotationRef.current.x + deltaY * 0.002,
				y: rotationRef.current.y + deltaX * 0.002,
			}

			setLastMousePos({ x: e.clientX, y: e.clientY })
		}
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas?.getContext('2d')
		if (!canvas || !ctx) return

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			const centerX = canvas.width / 2
			const centerY = canvas.height / 2
			const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
			const dx = mousePos.x - centerX
			const dy = mousePos.y - centerY
			const distance = Math.sqrt(dx * dx + dy * dy)
			const speed = 0.003 + (distance / maxDistance) * 0.01

			if (targetRotation) {
				const elapsed = performance.now() - targetRotation.startTime
				const progress = Math.min(1, elapsed / targetRotation.duration)
				const easedProgress = easeOutCubic(progress)

				rotationRef.current = {
					x:
						targetRotation.startX +
						(targetRotation.x - targetRotation.startX) * easedProgress,
					y:
						targetRotation.startY +
						(targetRotation.y - targetRotation.startY) * easedProgress,
				}

				if (progress >= 1) {
					setTargetRotation(null)
				}
			} else if (!isDragging) {
				rotationRef.current = {
					x: rotationRef.current.x + (dy / canvas.height) * speed,
					y: rotationRef.current.y + (dx / canvas.width) * speed,
				}
			}

			iconPositions.forEach((icon, index) => {
				const cosX = Math.cos(rotationRef.current.x)
				const sinX = Math.sin(rotationRef.current.x)
				const cosY = Math.cos(rotationRef.current.y)
				const sinY = Math.sin(rotationRef.current.y)

				const rotatedX = icon.x * cosY - icon.z * sinY
				const rotatedZ = icon.x * sinY + icon.z * cosY
				const rotatedY = icon.y * cosX + rotatedZ * sinX

				const scale = (rotatedZ + 200) / 300
				const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200))

				ctx.save()
				ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY)
				ctx.scale(scale, scale)
				ctx.globalAlpha = opacity

				if (icons || images) {
					if (
						iconCanvasesRef.current[index] &&
						imagesLoadedRef.current[index]
					) {
						ctx.drawImage(
							iconCanvasesRef.current[index],
							-ICON_RADIUS,
							-ICON_RADIUS,
							ICON_SIZE,
							ICON_SIZE
						)
					}
				} else {
					ctx.beginPath()
					ctx.arc(0, 0, ICON_RADIUS, 0, Math.PI * 2)
					ctx.fillStyle = '#4444ff'
					ctx.fill()
					ctx.fillStyle = 'white'
					ctx.textAlign = 'center'
					ctx.textBaseline = 'middle'
					ctx.font = '22px Arial'
					ctx.fillText(`${icon.id}`, 0, 0)
				}

				ctx.restore()
			})

			animationFrameRef.current = requestAnimationFrame(animate)
		}

		animationFrameRef.current = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationFrameRef.current)
		}
	}, [iconPositions, isDragging, mousePos, targetRotation])

	return (
		<div className="relative mx-auto max-w-[400px]">
			<canvas
				className="mx-auto rounded-lg"
				ref={canvasRef}
				width={360}
				height={360}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			/>
		</div>
	)
}
