import './App.css'
import Header from './Header'
import Home from './Home'
import Checkout from './Checkout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import { useEffect } from 'react'
import { auth } from './firebase'
import Payment from './Payment'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './Orders'

const promise = loadStripe(
    'pk_test_51MJd6YIozjBYMHtYhIUCPfJ9fp7VhoJ3W3lXYYSIPsOKI7dKJUbWG00ZH3n2XIl5RQz5sVoOv4bcBFOet31Bn1GZ00PP4bDh3m',
)

function App() {
    const [{}, dispatch] = useStateValue()
    useEffect(() => {
        // will only once when the app component loads.....
        auth.onAuthStateChanged((authUser) => {
            console.log('THE USER IS >>> ', authUser)
            if (authUser) {
                // the user logged in
                dispatch({
                    type: 'SET_USER',
                    user: authUser,
                })
            } else {
                // the user logged out
                dispatch({
                    type: 'SET_USER',
                    user: null,
                })
            }
        })

        // when unmount component.........
        return () => {}
    }, [])

    return (
        // BEM
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route
                        path="/payment"
                        element={
                            <>
                                <Header />
                                <Elements stripe={promise}>
                                    <Payment />
                                </Elements>
                            </>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <>
                                <Header />
                                <Checkout />
                            </>
                        }
                    />
                    <Route
                        path="/orders"
                        element={
                            <>
                                <Header />
                                <Orders />
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                <Home />
                            </>
                        }
                    />
                    {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}
                    <Route
                        path="*"
                        element={
                            <>
                                <Header />
                                <Home />
                            </>
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
