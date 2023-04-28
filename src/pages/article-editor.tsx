
import { useEffect, useRef } from 'react'
import style from './styles/articleEditor.module.css'
import Editor from '@/components/Editor'
export default function articleEditor() {
    const editorRef = useRef(null)
    useEffect(() => {
        console.log(editorRef.current);
        console.log('父組件觸發useEffect');        
    }, [])
    return (
        <div>
            <div className={style.editor}>
                {/* <div className={style.submitBtn} onClick={submit}>送出</div> */}
                <Editor ref={editorRef}/>
            </div>
        </div>
    )
}