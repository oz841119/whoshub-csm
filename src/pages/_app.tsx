import '@/styles/global.css'
import '@/styles/globarEditor.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [isUseDashboardLayout, setIsUseDashboardLayout] = useState(true)
	useEffect(() => {
		setIsUseDashboardLayout(router.pathname !== '/login')
	}, [isUseDashboardLayout, router.pathname])
	
  	return (
    <>
		{isUseDashboardLayout 
			? 
			<Layout>
				<Component {...pageProps} />
			</Layout>
			:
			<Component {...pageProps} />
		}
    </>
  )
}
