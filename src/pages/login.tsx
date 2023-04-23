import style from './styles/login.module.css'
export default function Login() {
    return (
        <div className={style.loginPage}>
            <div className={style.loginCard}>
                <div className={style.title}>WhosHub Login</div>
                <form className={style.form} action="/login" method="post">
                    <div className={style.detail}>
                        <label htmlFor="account">Account</label>
                        <input className={style.input} type="text" id="account" name="account" autoComplete="off"/>
                    </div>
                    <div className={style.detail}>
                        <label htmlFor="password">Password</label>
                        <input className={style.input} type="password" id="password" name="password"/>
                    </div>
                    <input className={style.submit} type="submit" value="登入"/>
                </form>
            </div>
        </div>
    )
}