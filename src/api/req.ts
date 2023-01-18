import axios from 'axios'

const req = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

export default req