
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import style from './styles/articleEditor.module.css'
import Editor from '@/components/ArticleEditor/Editor'
import ArticleForm from '@/components/ArticleEditor/ArticleForm'
import { Button } from '@mui/material'

type EditorRefCurrent = {
    getHTML: () => string;
}

type ArticleFormRef = {
    extractArticleInfo: () => ArticleInfo
}
type ArticleInfo = {
    summary: string
    title: string
    tags: string[]
}

export default function addArticle() {
    const editorRef = useRef<EditorRefCurrent | null>(null)
    const articleFormRef = useRef<ArticleFormRef | null>(null)
    const [articleHTML, setArticleHTML] = useState<string | null>(null)
    useEffect(() => {
        const editorContentBackup = localStorage.getItem('editorContentBackup')
        editorContentBackup && setArticleHTML(editorContentBackup)
        const bachupEditorTimer = setTimeout(backupEditor, 3000);
        return () => {
            clearInterval(bachupEditorTimer)
        }
    }, [])

    function submit() {
        if(!editorRef.current) return
        if(!articleFormRef.current) return null
        const articleInfo = articleFormRef.current.extractArticleInfo()
        
        const params = {
            title: articleInfo.title,
            summary: articleInfo.summary,
            tags: articleInfo.tags,
            content: editorRef.current.getHTML(),
            release_date: new Date().valueOf(),
            edit_date: new Date().valueOf(),
            views: '這篇文章是新發佈' ? 0 : '當前瀏覽數',
            id: (Math.floor(Math.random() * 9000) + 1000).toString()
        }
        const fetchConfig = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(params)
        }
        fetch('http://localhost:3333/article', fetchConfig)
            .then(res => res.json())
            .then(response => {
                console.log(response);
            })  
            .catch(err => {
                console.log(err);
            })
    }
    function backupEditor() {
        if(!editorRef.current) return
        if(!articleFormRef.current) return null
        const content = editorRef.current.getHTML()
        localStorage.setItem('editorContentBackup', content)
    }
    if(articleHTML === null) return null
    return (
        <div>
            <div className={style.btnWrap}>
                <Button variant="contained" onClick={submit} size="small">送出</Button>
                <Button variant="contained" size="small" color="success">草稿</Button>
            </div>
            <ArticleForm ref={articleFormRef}/>
            <div className={style.editor}>
                <Editor ref={editorRef} initContent={articleHTML}/>
            </div>
        </div>
    )
}