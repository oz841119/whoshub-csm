import { TextField } from '@mui/material'
import { forwardRef, useImperativeHandle } from 'react'
  
interface ExtractArticleInfo {
    title: string
}

export default forwardRef(ArticleForm)
function ArticleForm(props: any, ref: any) {
    useImperativeHandle(ref, () => {
        return {
            extractArticleInfo: extractArticleInfo
        }
    })
    function extractArticleInfo(): ExtractArticleInfo {
        const title = (document.getElementById('articleFormTitle') as HTMLInputElement).value
        return {title}
    }
    return (
        <div>
            <TextField required id="articleFormTitle" label="標題" size="small" sx={{width: '400px'}}/>
        </div>
    )
}