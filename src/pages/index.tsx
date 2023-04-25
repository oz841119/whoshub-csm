import Link from 'next/link'
import { useEffect } from 'react'
export default function Index() {
    useEffect(() => {
        // if(true) router.push('/login')
    }, [])
    return (
        <div>
            <Link href="/article-editor">a</Link>
        </div>
    )
}