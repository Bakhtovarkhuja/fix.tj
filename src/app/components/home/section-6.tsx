import { Globe } from '@/components/magicui/globe'

export function Section6() {
	return (
		<div className='relative flex w-[100%] h-[90vh] items-end  overflow-hidden  justify-between border bg-background px-40 pb-40 pt-0 md:pb-60'>
			<div className='w-[45%]'>
				<b className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-6xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 mt-[-200px]'>
					Истифодабарандагони мо аз тамоми ҷаҳон
				</b>
			</div>
			<div className='w-[55%] absolute right-0 top-10'>
				<Globe className='' />
				<div className='pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]' />
			</div>
		</div>
	)
}
