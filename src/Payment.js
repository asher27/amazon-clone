import React, { useEffect, useState } from 'react'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { Link, useNavigate } from 'react-router-dom'
import './Payment.css'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Card } from '@material-ui/core'
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer'
import axios from './axios'
import { db, collection, addDoc, setDoc, doc } from './firebase'

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue()
    const navigate = useNavigate()

    const stripe = useStripe()
    const elements = useElements()

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // stripe expects the total in a currencies subunits : 1 dollar -> 100 cents
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret()
    }, [basket])

    // TODO : remove below
    console.log('THE SECRET IS >>> ', clientSecret)

    const handleSubmit = async (e) => {
        // do all the stripe codes...
        e.preventDefault()
        setProcessing(true)

        const payload = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            })
            .then(({ paymentIntent }) => {
                // paymentIntent = payment confirmation
                console.log('[paymentIntent] : ', paymentIntent)

                // save to db.................
                const orderDocRef = doc(db, 'orders', paymentIntent.id)
                setDoc(orderDocRef, {
                    userId: user?.uid,
                    userEmail: user?.email,
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                })
                    .then(() => {
                        console.log('[orderDocRef] Document has been added successfully')
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                // save to db.................

                setSucceeded(true)
                setError(null)
                setProcessing(false)

                dispatch({
                    type: 'EMPTY_BASKET',
                })

                navigate('/orders')
            })
    }
    const handleChange = (e) => {
        // listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(e.empty)
        setError(e.error ? e.error.message : '')
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to={'/checkout'}>{basket?.length} items</Link>)
                </h1>
                {/*Delivery section*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>
                {/*Review Items section*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map((item, i) => (
                            <CheckoutProduct
                                id={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                key={i}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix="$"
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>
                            {/*Errors*/}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
