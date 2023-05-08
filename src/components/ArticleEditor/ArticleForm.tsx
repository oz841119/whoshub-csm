import { Chip, TextField } from '@mui/material'
import { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Autocomplete, { AutocompleteRenderInputParams, createFilterOptions } from '@mui/material/Autocomplete';

export default forwardRef(ArticleForm)
function ArticleForm(props: any, ref: any) {
    const [tags, setTags] = useState<string[]>([])
    useImperativeHandle(ref, () => {
        return {
            extractArticleInfo: extractArticleInfo,
        }
    })
    function extractArticleInfo(): ExtractArticleInfo {
        const title = (document.getElementById('articleFormTitle') as HTMLInputElement).value
        return {title, tags}
    }
    function onTagsInputChange(tags: string[]) {
        setTags(tags)
        return
    }
    return (
        <div>
            <div>
                <div style={{marginBottom: '6px'}}>
                    <AutoTagsInput inputChange={onTagsInputChange}></AutoTagsInput>
                </div>
            </div>
            <TextField variant="standard" id="articleFormTitle" label="標題" size="small" sx={{width: '400px'}}/><br/><br/>
            <TextField variant="standard" id="articleFormSummary" label="簡介" size="small" sx={{width: '400px'}}/>
        </div>
    )
}

function AutoTagsInput({inputChange}: {inputChange: (tag: string[]) => void}) {
    const [tags, setTags] = useState<string[]>([])
    const filter = createFilterOptions();
    const [allTags, setAlltags] = useState<any>([])
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/oz841119/typicode-api/tags/')
        .then(res => res.json())
        .then(result => {
            setAlltags(result)
        })
    }, [])
    function filterOptions(options: string[], params: any) {        
        const filtered: string[] = filter(options, params) as string[]
        const {inputValue} = params
        if(inputValue !== '') filtered.push(inputValue)
        return filtered
    }
    return (
        <Autocomplete
            loading={true}
            loadingText="Loading..."
            size="small"
            value={tags}
            onChange={(event, options) => {
                setTags(options)
                inputChange(options)
            }}
            options={allTags ? allTags : []}
            freeSolo
            filterOptions={filterOptions}
            multiple
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="標籤"
                    variant="standard"
                    sx={{width: '400px'}}
                />
            )}
        />
    )
}


interface ExtractArticleInfo {
    title: string
    tags: string[]
}