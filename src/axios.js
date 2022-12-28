import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://127.0.0.1:5001/clone-767d1/us-central1/api', // API Url
    baseURL: 'https://us-central1-clone-767d1.cloudfunctions.net/api', // API Url
})

export default instance
