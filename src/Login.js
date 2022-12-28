import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const signIn = (e) => {
        e.preventDefault()

        // firebase login ............
        const data = signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                console.log(auth)
                if (auth) {
                    navigate('/')
                }
            })
            .catch((error) => alert(error.message))
    }

    const register = async (e) => {
        e.preventDefault()

        // firebase register logic.....................
        const data = await createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                // create user without any error.
                console.log(auth)
                if (auth) {
                    navigate('/')
                }
            })
            .catch((error) => alert(error.message))
    }
    return (
        <div className="login">
            <Link to="/">
                <img
                    className="login__logo"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt=""
                />
            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form action="">
                    <h5>E-main</h5>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" onClick={signIn} className="login__signInButton">
                        Sign in
                    </button>
                </form>

                <p>
                    By continuing, you agree to Amazon's Fake test Clone site Conditions of Use and
                    Privacy Notice.
                </p>
                <button onClick={register} className="login__registerButton">
                    Create your Amazon Account
                </button>
            </div>
        </div>
    )
}

export default Login
