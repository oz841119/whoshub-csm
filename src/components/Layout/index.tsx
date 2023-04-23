import { ReactNode } from 'react'
import Navbar from './Navbar'

type LayoutProp = {
    children: ReactNode
}
export default function Layout({ children }: LayoutProp) {
    return (
        <>
            <Navbar/>
            <main>{children}</main>
        </>
    )
}