import axios from 'axios'
import { jwtDecode } from "jwt-decode";

let decode = null

if (typeof window !== 'undefined') {
	const token = localStorage.getItem('access_token')
	if (token) {
		try {
			decode = jwtDecode(token)
		} catch (e) {
			console.error(e)
		}
	}
}

const api = 'https://334768101201ee08.mokky.dev'

const axiosRequest = axios.create({
	baseURL: api
})

export default {api, axiosRequest, decode}