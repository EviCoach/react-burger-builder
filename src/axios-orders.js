import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-burger-293ce.firebaseio.com/'
})

export default instance