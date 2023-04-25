import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import style from './styles/Editor.module.css'
import 'remixicon/fonts/remixicon.css'

export default function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                code: {
                    HTMLAttributes: {
                        class: 'editor-code',
                    },
                }
            })
        ],
        content: '<p>Hello World! 🌎️</p>',
    })!
    const tools = {
        setBlod: () => editor.commands.toggleBold(),
        setCode: () => editor.commands.toggleCode(),
        setHeading: (level: any) => editor.commands.toggleHeading({level}),
    }
    return (
        <>
            <div className={style.tools}>
                <div className={style.toolItem} onClick={tools.setBlod}><i className="ri-bold"></i></div>
                <div className={style.toolItem} onClick={() => tools.setHeading(1)}><i className="ri-h-1"></i></div>
                <div className={style.toolItem} onClick={() => tools.setHeading(2)}><i className="ri-h-2"></i></div>
                <div className={style.toolItem} onClick={() => tools.setHeading(3)}><i className="ri-h-3"></i></div>
                <div className={style.toolItem} onClick={() => tools.setHeading(4)}><i className="ri-h-4"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-code-s-slash-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-code-box-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-underline"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-link-m"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-list-unordered"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-image-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-film-line"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-separator"></i></div>
                <div className={style.toolItem} onClick={tools.setCode}><i className="ri-send-plane-2-line"></i></div>
            </div>
            <div style={{padding: '12px'}}>
                <EditorContent editor={editor}/>
            </div>
        </>
    )
}