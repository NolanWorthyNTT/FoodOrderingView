import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

function Login(props) {
    const history = useHistory();
    const [password, setPassword] = useState('');

    // runs when props.role is updated. props.setRole() is async
    useEffect(() => {
        if(props.role === 'user') {
            history.push('/menu');
        } else if (props.role === 'admin') {
            history.push('/admin');
        }
    }, [props.role, history]);

    const sendHttpRequest = (method, url, data) => {
        const promise = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.setRequestHeader('Content-type', 'application/json');

            // fires on response
            xhr.onload = () => {
                resolve(JSON.parse(xhr.response));
            };

            xhr.send(JSON.stringify(data));
        })
        return promise;
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // input validation
        if(props.username.length > 50) {
            alert('Username should be less than 50 characters');
            return;
        } else if (password.length > 255) {
            alert('Password should be lass than 255 characters');
            return;
        }

        // make post request to API endpoint. parse response
        sendHttpRequest('POST', 'http://localhost:8080/login', {
            "username": props.username,
            "password": password
        }).then(responseData => {
            if(responseData.userId === -1) {
                // if no match for user, indicate accordingly
                props.setRole('no user');
            } else {
                // if match for user, set states to user's info
                props.setUserId(responseData.userId);
                if(responseData.admin === false) {
                    props.setRole('user');
                } else {
                    props.setRole('admin');
                }
            }
        });
    }

    return (
        <div>
            <h3 class="login-head">Log In</h3>
            <form class="login-form" onSubmit={onSubmit}>
                <label htmlFor="username">Username</label><br />
                <input type="text" id="username" name="username" value={props.username} onChange={(e) => props.setUsername(e.target.value)} /><br />
                <label htmlFor="password">Password</label><br />
                <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <input type="submit" value="Log In" />
            </form>
            <p>{props.role === 'no user' && 'Invalid Login'}</p>
        </div>
    )
}

export default Login;