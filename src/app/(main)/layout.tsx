import Footer from '../components/layout/footer'
import Header from '../components/layout/header'

export default async function LocaleLayout({
	children,
}: {
	children: React.ReactNode
	params: Promise<{ locale: string }>
}) {

	return (
		<html>
			<body>
				<Header></Header>
				{children}
				<Footer></Footer>
			</body>
		</html>
	)
}
