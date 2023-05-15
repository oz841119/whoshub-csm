import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import style from './Editor.module.css'
import 'remixicon/fonts/remixicon.css'
import Underline from '@tiptap/extension-underline';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight/lib/common';

export default forwardRef(Editor)

function Editor(props: any, ref: any) {
    const editor = useEditor({
        extensions: [
            Underline.configure(),
            CodeBlockLowlight.configure({
                lowlight, defaultLanguage: 'plaintext', languageClassPrefix: 'language-javascript',
            }),
            StarterKit.configure({
                code: {
                    HTMLAttributes: {
                        class: 'editor-code',
                    },
                },
                bulletList: {
                    HTMLAttributes: {
                        class: 'editor-bulletList',
                    },
                }
            })
        ],
        content: props.initContent
    })!
    const tools = {
        setBlod: () => editor.commands.toggleBold(),
        setCode: () => editor.commands.toggleCodeBlock(),
        setHeading: (level: any) => editor.commands.toggleHeading({level}),
        getHTML: () => editor.getHTML(),
        setBulletList: () => editor.commands.toggleBulletList(),
        toogleUnderLine: () => editor.commands.toggleUnderline()
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
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-code-box-line"></i></div>
                <div className={style.toolItem} onClick={tools.toogleUnderLine}><i className="ri-underline"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-link-m"></i></div>
                <div className={style.toolItem} onClick={tools.setBulletList}><i className="ri-list-unordered"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-image-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-film-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-separator"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-send-plane-2-line"></i></div>
                <div className={style.toolItem} onClick={tools.getHTML}><i className="ri-expand-right-line"></i></div>
            </div>
            <div style={{padding: '12px', height: '500px', overflow: 'auto'}}>
                <EditorContent editor={editor}/>
            </div>
        </>
    )
}
