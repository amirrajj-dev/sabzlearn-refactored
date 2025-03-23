import axios from 'axios'

const axiosnInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials : true
})

export default axiosnInstance