import { Chip, TextField } from '@mui/material'
import { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Autocomplete, { AutocompleteRenderInputParams, createFilterOptions } from '@mui/material/Autocomplete';

export default forwardRef(ArticleForm)
function ArticleForm(props: any, ref: any) {
    const [tags, setTags] = useState<string[]>([])
    useImperativeHandle(ref, () => {
        return {
            extractArticleInfo: extractArticleInfo
        }
    })
    function extractArticleInfo(): ExtractArticleInfo {
        const title = (document.getElementById('articleFormTitle') as HTMLInputElement).value
        return {title}
    }
    function onTagsInputChange(tag: string) {
        if(tags.includes(tag)) return
        setTags(prevTags => [...prevTags, tag])
        return
    }
    function handleDeleteTag(tag: string) {
        setTags(prevTags => prevTags.filter(prevTag => prevTag !== tag))
    }
    return (
        <div>
            <div>
                <div style={{marginBottom: '6px'}}><AutoTagsInput inputChange={onTagsInputChange}></AutoTagsInput></div>
                {tags.map(tag => <Chip sx={{marginRight: '4px'}} label={tag} onDelete={() => handleDeleteTag(tag)} key={tag}/>)}
            </div>
            <TextField variant="standard" id="articleFormTitle" label="標題" size="small" sx={{width: '400px'}}/>
        </div>
    )
}

function AutoTagsInput({inputChange}: {inputChange: (tag: string) => void}) {
    const filter = createFilterOptions();
    const [allTags, setAlltags] = useState<any>([])
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/oz841119/typicode-api/tags/')
        .then(res => res.json())
        .then(result => {
            setAlltags(result)
        })
    }, [])
    function onChange(event: any, newValue: any) {
        if(!newValue) return
        const isExisting = typeof newValue === 'string'
        if(isExisting) inputChange(newValue)
        else inputChange(newValue.inputValue)
        event.target.value = ''
    }
    function filterOptions(options: AutocompleteOptions[], params: any) {        
        const filtered: AutocompleteOptions[] = filter(options, params) as AutocompleteOptions[]
        const {inputValue} = params
        if(inputValue !== '') filtered.push({title: `添加: ${inputValue}`, inputValue})
        return filtered
    }

    const [value, setValue] = useState(null)
    return (
        <Autocomplete
            loading={true}
            loadingText="Loading..."
            size="small"
            onChange={onChange}
            value={value}
            options={allTags ? allTags : []}
            filterOptions={filterOptions}
            getOptionLabel={(option: AutocompleteOptions) => {
                if(typeof option === 'string') {
                    return option
                } else {
                    return option.title
                }
            }}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="標籤"
                    variant="standard"
                    sx={{width: '100px'}}
                />
            )}
        />
    )
}


interface ExtractArticleInfo {
    title: string
}

type AutocompleteOptions = string | {
    title: string
    inputValue: string
}