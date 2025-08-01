import { create } from 'zustand'
import axios from 'axios'

interface Review {
	id: number
	content: string
	rating: number
	author: string
	date: string
}

interface Comment {
	id: number
	content: string
	author: string
	date: string
}

interface User {
	id: number
	name: string
	surname: string
	role: string
	status: boolean
	review: Review[]
	comment: Comment[]
	email: string
	number: number
	password: string
	avatar: null | string
	job: string
	experience: string
	wish: boolean
	country: string
	raiting: number
	price: number
	order: boolean
}

interface ZaprosState {
	users: User[]
	masterById: User | null
	me: User | null
	getUsers: () => Promise<void>
	register: (newUser: Partial<User>) => Promise<void>
	login: (user: { email: string; password: string }) => Promise<void>
	getMasterById: (id: number) => Promise<void>
	sendReview: (id: number, review: Review) => Promise<void>
	orderMasterComment: (id: number, comment: Comment) => Promise<void>
	orderMaster: (id: number, order: Partial<User>) => Promise<void>
	editProfil: (id: number, updateUser: Partial<User>) => Promise<void>
	mee: (id: number) => Promise<void>
	removeComment: (userId: number, commentId: number) => Promise<void>
  filterMasters: ({ job, country }: { job: string; country: string }) => Promise<void>

}

export const useZapros = create<ZaprosState>((set, get) => ({
	users: [],
	masterById: null,
	me: null,

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
				`https://334768101201ee08.mokky.dev/users/${id}`
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

	orderMasterComment: async (id, comment) => {
		try {
			const { data: user } = await axios.get(
				`https://334768101201ee08.mokky.dev/users/${id}`
			)
			const comments = [...(user.comment || []), comment]

			await axios.patch(`https://334768101201ee08.mokky.dev/users/${id}`, {
				comment: comments,
			})
			get().getMasterById(id)
		} catch (error) {
			console.error(error)
		}
	},

	orderMaster: async (id, order) => {
		try {
			await axios.patch(`https://334768101201ee08.mokky.dev/users/${id}`, order)
			get().getUsers()
		} catch (error) {
			console.error(error)
		}
	},

	editProfil: async (id, updateUser) => {
		try {
			await axios.patch(
				`https://334768101201ee08.mokky.dev/users/${id}`,
				updateUser
			)
		} catch (error) {
			console.error(error)
		}
	},
	mee: async id => {
		try {
			const { data } = await axios.get(
				`https://334768101201ee08.mokky.dev/users/${id}`
			)
			set({ me: data })
		} catch (error) {
			console.error(error)
		}
	},
	filterMasters: async ({ job, country }) => {
		const params = new URLSearchParams()

		if (job && job !== 'all') params.append('job', job)
		if (country && country !== 'all') params.append('country', country)

		try {
			const { data } = await axios.get(
				`https://334768101201ee08.mokky.dev/users?${params.toString()}`
			)
			set({ users: data })
		} catch (error) {
			console.error(error)
		}
	},
  removeComment: async (userId, commentId) => {
  try {
    const res = await axios.get(`https://334768101201ee08.mokky.dev/users/${userId}`)
    const user = res.data

    const updatedComments = user.comment.filter((c: Comment) => c.id !== commentId)


    await axios.patch(`https://334768101201ee08.mokky.dev/users/${userId}`, {
      comment: updatedComments
    })
  } catch (error) {
    console.error('Ошибка при удалении комментария:', error)
  }
}


}))

export default useZapros
