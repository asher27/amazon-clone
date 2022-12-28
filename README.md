# Amazon Clone Coding - from YouTube Clever Programmer

This project was baseed on youtube clip of [Clever Progammer](https://youtu.be/RDV3Z1KCBvo?list=PL9nZhFiGQygu73mdKZy8B-2T9I9YcuNhe).

## Updates

In this project, updates some code cause some features of Firebase, React changed as of 2022.

### `import firebase`

```javascript 
package.json
"firebase": "^9.15.0",
```
need to change the way of import 
```javascript 
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    query,
    where,
    getDocs,
    orderBy,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
your code.....
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth, collection, addDoc, setDoc, doc, query, where, getDocs, orderBy }
```
and then import functions like belows,
```javascript
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

```

### `Save to firebase Firestore`
lots of function name and chaining changes since firebase 9.....so i changed as below and it works well..
```javascript
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

```

### `Query from firebase Firestore`
it's same reason as above.  it works well..
```javascript
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

```

### `useHistory() -> useNavigate()`
have used useNavigate() other than useHistory() since function changed since i'm using React 17 version.
```javascript
navigate = useNavigate()
navigate('/urlToGo..')
```
 
