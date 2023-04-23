import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect } from 'react'
export default function Index() {
    const router = useRouter()
    useEffect(() => {
        if(true) router.push('/login')
    }, [])
    return (
        <div>
            {false && (<div>none</div>)}
        </div>
    )
}