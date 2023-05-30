import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import style from './styles/article-manage.module.css'
import { Alert, Snackbar } from '@mui/material';
import FullLoading from '@/components/utils/FullLoading';
import Link from 'next/link';

export default function articleManage() {
    const [articles, setArticles] = useState([])
    const [isAlertMessage, setIsAlertMessage] = useState(false)
    const [alertMessageOptions, setAlertMessageOptions] = useState<AlertMessageProp["options"]>({type: 'success', message: '取得資料成功'})
    const [isFullLoading, setIsFullLoading] = useState(true)
    useEffect(() => { // 取得文章列表
        fetch('http://localhost:3333/article_list')
            .then(res => res.json())
            .then(response => {
                setIsAlertMessage(true)
                setArticles(response)
                delayToCloseAlertMessage()
                setIsFullLoading(false)
            })
            .catch(() => {
                setAlertMessageOptions({type: 'error', message: '取得資料失敗'})
                setIsAlertMessage(true)
                delayToCloseAlertMessage()
                setIsFullLoading(false)
            })
    }, [])

    function delayToCloseAlertMessage(delay: number | undefined = 2500) {
        setTimeout(() => {
            setIsAlertMessage(false)
        }, delay);
    }
    return (
        <div>
            <ArticleTable articles={articles}/>
            <AlertMessage isOpen={isAlertMessage} options={alertMessageOptions}/>
            <FullLoading isOpen={isFullLoading}/>
        </div>
    )
}


function ArticleTable({articles}: ArticleTableProps) {
    const deleteArticle = async (articleId: string) => {
        const check = await window.confirm(`確認刪除`)
        if(!check) return
        const config = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({articleId})
        }
        fetch('http://localhost:3333/article', config)
            .then(r => r.json())
            .then(response => {
                const {isSuccess, id} = response
                console.log(isSuccess, id);
            })
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>標題</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>瀏覽數</TableCell>
                    <TableCell>發布時間</TableCell>
                    <TableCell>編輯時間</TableCell>
                    <TableCell>操作</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {articles.map(article => (
                        <TableRow key={article.id}>
                            <TableCell sx={{'maxWidth': '200px'}}>{article.title}</TableCell>
                            <TableCell>{article.id}</TableCell>
                            <TableCell>{article.views}</TableCell>
                            <TableCell>{article.release_date}</TableCell>
                            <TableCell>{article.edit_date}</TableCell>
                            <TableCell>
                                <Link href={{pathname: '/add-article', query: {edit: article.id}}}><EditIcon className={style.icon} onClick={() => {}}/></Link>
                                <DeleteForeverIcon className={style.icon} onClick={() => deleteArticle(article.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function AlertMessage({isOpen, options}: AlertMessageProp) {
    return (
        <Snackbar open={isOpen} autoHideDuration={6000}>
            <Alert severity={options.type} sx={{ width: '100%' }}>
                {options.message}
            </Alert>
        </Snackbar>
    )
}


type Articles = {
    title: string,
    id: string,
    views: number,
    edit_date: number,
    release_date: number,
    content: string
}

type ArticleTableProps = {
    articles: Articles[]
}

type AlertMessageProp = {
    isOpen: boolean
    options: {
        message: string,
        type: 'success' | 'error'
    }
}