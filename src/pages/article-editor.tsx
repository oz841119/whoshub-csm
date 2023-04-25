
import style from './styles/articleEditor.module.css'
import Editor from '@/components/Editor'
export default function articleEditor() {
    function submit() {}
    return (
        <div>
            <div className={style.editor}>
                {/* <div className={style.submitBtn} onClick={submit}>送出</div> */}
                <Editor/>
            </div>
        </div>
    )
}