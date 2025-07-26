import { create } from 'zustand'
import axios from 'axios'

export const useZapros = create((set, get) => ({
	users: [],
	masterById: [],
	getUsers: async () => {
		try {
			const { data } = await axios.get(
				'https://334768101201ee08.mokky.dev/users'
			)
			set({ users: data })
		} catch (error) {
			console.error(error)
		}
	},
	changeWishStatus: async (id, user) => {
		try {
			await axios.patch('https://334768101201ee08.mokky.dev/users/' + id, user)
			get().getUsers()
		} catch (error) {
			console.error(error)
		}
	},
	register: async newUser => {
		try {
			await axios.post('https://334768101201ee08.mokky.dev/register', newUser)
		} catch (error) {
			console.error(error)
		}
	},
	login: async user => {
		try {
			const { data } = await axios.post(
				'https://334768101201ee08.mokky.dev/auth',
				user
			)
			localStorage.setItem('access_token', data.token)
		} catch (error) {
			console.error(error)
		}
	},
	getMasterById: async id => {
		try {
			const { data } = await axios.get(
				'https://334768101201ee08.mokky.dev/users/' + id
			)
			set({ masterById: data })
		} catch (error) {
			console.error(error)
		}
	},
	sendReview: async (id, newReview) => {
		try {
			const { data: user } = await axios.get(
				`https://334768101201ee08.mokky.dev/users/${id}`
			)
			const updatedReviews = [...(user.review || []), newReview]

			await axios.patch(`https://334768101201ee08.mokky.dev/users/${id}`, {
				review: updatedReviews,
			})
			get().getMasterById(id)
		} catch (error) {
			console.error(error)
		}
	},
	filterByExperiense: async (year) => {
		try {
			const { data } = await axios.get('https://334768101201ee08.mokky.dev/users?experience=' + year)
			set({users: data})
		} catch (error) {
			console.error(error);
		}
	},
	filterByJob: async (country) => {
		try {
			const { data } = await axios.get('https://334768101201ee08.mokky.dev/users?job=' + country)
			set({users: data})
		} catch (error) {
			console.error(error);
		}
	},
	filterByName: async (country) => {
		try {
			const { data } = await axios.get('https://334768101201ee08.mokky.dev/users?name=' + country)
			set({users: data})
		} catch (error) {
			console.error(error);
		}
	},
	filterByCountry: async (country) => {
		try {
			const { data } = await axios.get('https://334768101201ee08.mokky.dev/users?country=' + country)
			set({users: data})
		} catch (error) {
			console.error(error);
		}
	},
}))

export default useZapros
