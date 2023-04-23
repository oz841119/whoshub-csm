import { useEffect, useRef } from 'react';

export default async function Editor() {
    const editorRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(editorRef.current === null) return
    }, [])
    return (
        <div ref={editorRef}>213</div>
    )
}