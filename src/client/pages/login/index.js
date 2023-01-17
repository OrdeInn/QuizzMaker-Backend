import { useState } from 'react';
import styles from '../../styles/Login.module.css';

export default function Login() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: e.target.email.value, password: e.target.password.value})
        };
        let status = null;

        fetch('http://localhost:8080/user/signin', requestOptions)
            .then((response) => {
                status = response.status;
                return response.json();
            })
            .then((data) => {
                if (status != '200') {
                    setErrorMessage(data.message);
                    setIsLoggedIn(false);
                } else {
                    setErrorMessage(null);
                    setIsLoggedIn(true);
                }
            })
            .catch(e => console.log(e));
    };

    return(
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
            <div className={styles.title}>Sign In</div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <label>Email</label>
                        <input className={styles.emailInput} type="email" name="email" required />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Password</label>
                        <input className={styles.passwordInput} type="password" name="password" required />
                        {errorMessage && (<div className={styles.error}>{errorMessage}</div>)}
                    </div>
                    <div className={styles.buttonContainer}>
                        <input className={styles.submitInput} type="submit" />
                    </div>
                </form>
                {isLoggedIn && (<div className="submitted">{"Successfully logged in"}</div>)}
            </div>
        </div>
    )
}
