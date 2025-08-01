import { IconCloud } from '@/components/magicui/icon-cloud'

const slugs = [
	 "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
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
