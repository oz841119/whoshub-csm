import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import style from './Editor.module.css'
import 'remixicon/fonts/remixicon.css'

export default forwardRef(Editor)

function Editor(props: any, ref: any) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                code: {
                    HTMLAttributes: {
                        class: 'editor-code',
                    },
                },
            })
        ],
        content: props.initContent
    })!
    const tools = {
        setBlod: () => editor.commands.toggleBold(),
        setCode: () => editor.commands.toggleCode(),
        setHeading: (level: any) => editor.commands.toggleHeading({level}),
        setHardBreak: () => editor.commands.setHardBreak(),
        getHTML: () => editor.getHTML(),
    } 
    useImperativeHandle(ref, () => {
        if(!editor) return {}
        else return ({getHTML: tools.getHTML})
    })
    return (
        <>
            <div className={style.tools}>
                <div className={style.toolItem} onClick={tools.setBlod}><i className="ri-bold"></i></div>
                <div className={style.toolItem} onClick={() => tools.setHeading(1)}><i className="ri-h-1"></i></div>
                <div className={style.toolItem} onClick={() => tools.setHeading(2)}><i className="ri-h-2"></i></div>
                <div className={style.toolItem} onClick={() => tools.setHeading(3)}><i className="ri-h-3"></i></div>
                <div className={style.toolItem} onClick={() => tools.setHeading(4)}><i className="ri-h-4"></i></div>
                <div className={style.toolItem} onClick={tools.setHardBreak}><i className="ri-code-s-slash-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-code-box-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-underline"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-link-m"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-list-unordered"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-image-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-film-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-separator"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-send-plane-2-line"></i></div>
                <div className={style.toolItem} onClick={tools.getHTML}><i className="ri-expand-right-line"></i></div>
            </div>
            <div style={{padding: '12px'}}>
                <EditorContent editor={editor}/>
            </div>
        </>
    )
}
