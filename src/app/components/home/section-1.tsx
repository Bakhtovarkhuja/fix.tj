import { IconCloud } from '@/components/magicui/icon-cloud'

const slugs = [
	'typescript',
	'javascript',
	'react',
	'html5',
	'css3',
	'nextdotjs',
	'vercel',
	'git',
	'jira',
	'github'
]

export function Section1() {
	const images = slugs.map(slug => {
		if (slug.startsWith('http')) return slug
		return `https://cdn.simpleicons.org/${slug}/${slug}`
	})

	return (
		<div className='relative flex size-full items-center justify-center overflow-hidden'>
			<IconCloud images={images} />
		</div>
	)
}
