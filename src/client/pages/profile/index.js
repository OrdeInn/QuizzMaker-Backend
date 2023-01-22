import { useState } from "react";

export default function UserProfile() {
    const [isFetched, setIsFetched] = useState(false);
    function test () {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };
        console.log('triggering fetch!')
        fetch('http://localhost:8080/user/', requestOptions)
            .then(()=> {
                setIsFetched(true);
            })
            .catch(e => console.log(e));
    }

    return(
        <div>
            {!isFetched ? test() : null}
            User Profile Page
        </div>
    );
};