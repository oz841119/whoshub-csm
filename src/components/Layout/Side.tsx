import Link from 'next/link'
import style from './styles/Side.module.css'
export default function Side() {
    return (
        <div className={style.side}>
            <Link className={style.title} href="/">Whos CMS</Link>
            <div className={style.user}>User</div>
            <div className={style.items}>
                <Link className={style.item} href="/add-article">新增文章</Link>
                <Link className={style.item} href="/article-manage">文章管理</Link>
                <Link className={style.item} href="/">數據分析</Link>
            </div>
        </div>
    )
}