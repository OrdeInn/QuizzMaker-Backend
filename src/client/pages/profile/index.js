import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from '../../styles/Profile.module.css';

export default function Profile() {
    const [isFetched, setIsFetched] = useState(false);
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [isFetched]);

    function test() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        fetch('http://localhost:8080/user/', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setIsFetched(true);
                setUser(data.user);
            })
            .catch(e => console.log(e));
    }
    if (!isFetched) {
        test();
    }
    return (
        <div className={styles.container}>
            <div className={styles.profileContainer}>
                <div className={styles.profileImg}></div>
                <div className={styles.userName}>
                    {user ? user.email : ''}
                </div>
            </div>
            <div className={styles.quizContainer}>
                <div className={styles.quiz}>
                    <h4>Quizz Title 1</h4>
                    <div className={styles.quizData}>
                        <p>Quizz data 1</p>
                        <p>Quizz data 2</p>
                        <p>Quizz data 3</p>
                        <p>Quizz data 4</p>
                        <p>Quizz data 5</p>
                    </div>
                </div>
                <div className={styles.quiz}>
                    <h4>Quizz Title 2</h4>
                    <div className={styles.quizData}>
                        <p>Quizz data 1</p>
                        <p>Quizz data 2</p>
                        <p>Quizz data 3</p>
                        <p>Quizz data 4</p>
                        <p>Quizz data 5</p>
                    </div>
                </div>
                <div className={styles.quiz}>
                    <h4>Quizz Title 3</h4>
                    <div className={styles.quizData}>
                        <p>Quizz data 1</p>
                        <p>Quizz data 2</p>
                        <p>Quizz data 3</p>
                        <p>Quizz data 4</p>
                        <p>Quizz data 5</p>
                    </div>
                </div>
            </div>
        </div>
    );
};