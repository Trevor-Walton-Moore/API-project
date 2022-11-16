import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../button.css';
import '../input.css';
// import exMark from '../Errors/exMark.png'
import '../Errors/Errors.css';

function LoginForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                console.log('------DATA', data)
                if (data) setErrors(Object.values(data));
                else return (<Redirect to="/" />);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul className='list'>
                <li>{errors[0]}</li>
            </ul>
            <div className='container'>

                <label>
                    <input
                        className="input"
                        placeholder="Username or Email"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    <input
                        className="input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button className='submit' type="submit">

                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Log In</span>

                </button>
            </div>
        </form >
    );
}

export default LoginForm;
