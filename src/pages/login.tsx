import { FormEvent, useRef, useState } from 'react';
import style from './styles/login.module.css'
import { useRouter } from 'next/router';
export default function Login() {
    const router = useRouter()
    const accountInpRef = useRef<HTMLInputElement>(null)
    const passwordInpRef = useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = useState('')

    function login(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const account = accountInpRef.current?.value
        const password = passwordInpRef.current?.value
        if(account !== 'urIsCoolUser' || password !== 'xaxt5568fd3') {
            setErrorMessage('驗證錯誤')
            setTimeout(() => setErrorMessage(''), 1500);
        } else {
            router.push('/')
        }
    }
    return (
        <div className={style.loginPage}>
            <div className={style.loginCard}>
                <div className={style.title}>WhosHub Login</div>
                <form className={style.form} onSubmit={(event) => login(event)} method="post">
                    <div className={style.detail}>
                        <label htmlFor="account">Account</label>
                        <input className={style.input} type="text" id="account" name="account" autoComplete="off" ref={accountInpRef} defaultValue="urIsCoolUser"/>
                    </div>
                    <div className={style.detail}>
                        <label htmlFor="password">Password</label>
                        <input className={style.input} type="password" id="password" name="password" ref={passwordInpRef} defaultValue="xaxt5568fd3"/>
                    </div>
                    <div className={style.messageAndBtn}>
                        <div className={style.errorMes}>{errorMessage}</div>
                        <input className={style.submit} type="submit" value="登入"/>
                    </div>
                </form>
            </div>
        </div>
    )
}