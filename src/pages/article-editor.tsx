
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import style from './styles/articleEditor.module.css'
import Editor from '@/components/ArticleEditor/Editor'
import ArticleForm from '@/components/ArticleEditor/ArticleForm'

type editorRefCurrent = {
    getHTML: () => string;
}

export default function articleEditor() {
    const editorRef = useRef<editorRefCurrent | null>(null)
    const [articleHTML, setArticleHTML] = useState<string | null>(null)
    useEffect(() => {
        setArticleHTML(``)
    }, [])
    function submit() {
        if(!editorRef.current) return
        const params = {
            title: null,
            content: editorRef.current.getHTML(),
            release_date: '這篇文章有發佈時間' ? '初始發佈時間' : new Date().valueOf(),
            edit_date: new Date().valueOf(),
            views: '這篇文章是新發佈' ? 0 : '當前瀏覽數'
        }
        console.log(params);
    }
    if(articleHTML === null) return null
    return (
        <div>
            <div className={style.submitBtn} onClick={submit} style={{margin: '0 auto'}}>送出</div>
            <ArticleForm/>
            <div className={style.editor}>
                <Editor ref={editorRef} initContent={articleHTML}/>
            </div>
        </div>
    )
}