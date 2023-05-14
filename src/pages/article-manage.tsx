import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import style from './styles/article-manage.module.css'

export default function articleManage() {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        fetch('http://localhost:3333/article_list')
            .then(res => res.json())
            .then(response => {
                setArticles(response)
            })
    }, [])
    return (
        <div>
            <ArticleTable articles={articles}/>
        </div>
    )
}


function ArticleTable({articles}: ArticleTableProps) {
    const deleteArticle = (articleId: string) => {
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
                                <DeleteForeverIcon className={style.icon} onClick={() => deleteArticle(article.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
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