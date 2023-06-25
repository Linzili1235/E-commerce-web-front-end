import axios from "axios";
// const BASE_URL = 'https://nicole-shopping.onrender.com'
const BASE_URL = 'http://localhost:8000'

export const api_routes = {
    logIn: '/user/login',
    createUser: '/user/create',
    getUserInfo: '/user/oneUser',
    refreshToken: '/refresh',
    logOut: '/logout',
    updatePassword: '/user/update',
    createOrder: '/order/create',
    reviewOrder: '/order/review',
    createInvoice:'/order/invoice'
}

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
})