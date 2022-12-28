# Amazon Clone Coding - from YouTube Clever Programmer

This project was baseon youtube clip of [Clever Progammer](https://youtu.be/RDV3Z1KCBvo?list=PL9nZhFiGQygu73mdKZy8B-2T9I9YcuNhe).

## Updates

In the project, updates some code cause some features of Firebase, React changed as of 2023.

### `import firebase`

```javascript 
package.json
"firebase": "^9.15.0",
```
need to change the way of import 
```javascript 
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }
```
The page will reload when you make changes.\

and then import functions like belows,
```javascript
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

```

### `useHistory() -> useNavigate()`
use useNavigate() other than useHistory() since function changed since i'm using React 17 version.
```javascript
navigate = useNavigate()
navigate('/urlToGo..')
```
 