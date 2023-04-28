import style from './styles/whosInput.module.css'
export default function WhosInput(props: any) {
    const {lableName} = props
    
    return (
        <div className={style.whosInputWrap}>
            <label>{lableName}</label>
            <input type="text" defaultValue="123"/>
        </div>
    )
}