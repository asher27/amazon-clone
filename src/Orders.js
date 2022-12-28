import React, { useEffect, useState } from 'react'
import './Orders.css'
import { db, collection, query, where, getDocs, orderBy } from './firebase'
import { useStateValue } from './StateProvider'
import Order from './Order'

function Orders() {
    const [{ user }, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(async () => {
        console.log('[user] : ', user)
        if (user) {
            const q = query(
                collection(db, 'orders'),
                where('userId', '==', user?.uid),
                orderBy('created', 'desc'),
            )

            const querySnapshot = await getDocs(q)
            setOrders(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                })),
            )
        } else {
            setOrders([])
        }
    }, [user])
    console.log('[orders] : ', orders)
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders__order">
                {orders?.map((order, i) => (
                    <Order order={order} key={i} />
                ))}
            </div>
        </div>
    )
}

export default Orders
