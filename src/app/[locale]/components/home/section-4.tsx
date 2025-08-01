import { OrbitingCircles } from '@/components/magicui/orbiting-circles'
import { Earth, FileJson, Github, Star } from 'lucide-react'

export function Section4() {
	return (
		<div className='relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden'>
			<div className='w-[53%] h-[65%] absolute  rounded-full border border-gray-700'/>
			<div className='w-[33%] h-[40%] rounded-full border border-gray-700'/>
			<OrbitingCircles iconSize={80}>
				<Icons.whatsapp />
				<Icons.notion />
				<Icons.openai />
				<Icons.googleDrive />
				<Icons.whatsapp />
			</OrbitingCircles>
			<OrbitingCircles iconSize={80} radius={100} reverse speed={2}>
				<Icons.whatsapp />
				<Icons.notion />
				<Icons.openai />
				<Icons.googleDrive />
			</OrbitingCircles>
		</div>
	)
}

const Icons = {
	notion: () => <Github className='text-white' size={40} />,
	openai: () => <Earth className='text-blue-600' size={40} />,
	googleDrive: () => <Star className='text-yellow-600' size={40} />,
	whatsapp: () => <FileJson className='text-green-400' size={40} />,
}

