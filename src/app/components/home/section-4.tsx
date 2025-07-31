import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { Earth, FileJson, Github, Star } from 'lucide-react'

export function Section4() {
	return (
		<div className='relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden'>
			<div className='w-[53%] h-[65%] absolute  rounded-full border border-gray-700'/>
			<div className='w-[33%] h-[40%] rounded-full border border-gray-700'/>
			<OrbitingCircles iconSize={70}>
				<Icons.whatsapp />
				<Icons.notion />
				<Icons.openai />
				<Icons.googleDrive />
				<Icons.whatsapp />
			</OrbitingCircles>
			<OrbitingCircles iconSize={70} radius={100} reverse speed={2}>
				<Icons.whatsapp />
				<Icons.notion />
				<Icons.openai />
				<Icons.googleDrive />
			</OrbitingCircles>
		</div>
	)
}

const Icons = {
	notion: () => <Github className='text-white' />,
	openai: () => (
		<Earth className='text-blue-600'/>
	),
	googleDrive: () => (
		<Star className='text-yellow-600'/>
	),
	whatsapp: () => (
		<FileJson className='text-green-400'/>
	),
}
