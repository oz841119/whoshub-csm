import { ReactNode } from 'react'
// import Navbar from './Navbar'
import Side from './Side'
import style from './styles/index.module.css'

type LayoutProp = {
    children: ReactNode
}
export default function Layout({ children }: LayoutProp) {
    return (
        <div className={style.layout}>
            <Side/>
            <main className={style.main}>
                {/* <Navbar/> */}
                {children}
            </main>
        </div>
    )
}