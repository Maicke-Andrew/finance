import axios from 'axios'

export const axiosApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const useApi = () => ({
    items: {
        registerItem: async (id: string, item: object) => {
            try {
                const response = await axiosApi.post(`/item/create/${id}`, item)
                return response
            } catch (error) {
                return error
            }
        },
        getMyItems: async (userId: any, id: any) => {
            try {
                const response = await axiosApi.get(`/item/items/${userId}`, { params: { id: id } })
                return response.data
            } catch (error) {
                return error
            }
        },
        deleteItem: async (userId: any, itemId: any) => {
            try {
                const response = await axiosApi.delete(`/item/delete/${userId}`, { params: { id: itemId } })
                return response
            } catch (error) {
                return error
            }
        },
        updateItem: async (userId: any, item: any) => {
            try {
                const response = await axiosApi.patch(`/item/update/${userId}`, item)
                return response
            } catch (error) {
                return error
            }
        },
    },
    user: {
        emailNewPassword: async (email: string) => {
            try {
                const response = await axiosApi.post('/user/emailNewPassword', { email: email })
                return response.data
            } catch (err) {
                return { error: err }
            }
        },
        register: async (login: string, email: string, password: string) => {
            try {
                const response = await axiosApi.post('/user/create', { login, email, password });
                return response.data
            } catch (err) {
                return { error: err }
            }
        },
        validateGoogle: async (token: string) => {
            try {
                const response = await axiosApi.post('/user/enterWithGoogle', { token })
                return response.data
            } catch (error) {
                return error
            }
        },
        sendEmailNewAccount: async (user: object) => {
            try {
                const response = await axiosApi.post('/user/sendEmail', user)
                return response.data
            } catch (error) {
                return error
            }
        },
        newPassword: async (item: object) => {
            try {
                const response = await axiosApi.post('/user/newPassword', item)
                return response.data
            } catch (error) {
                return error
            }
        },
        newPicture: async (userId: string, img: File) => {
            try {
                const formData = new FormData();
                formData.append('dest', 'user-image');
                formData.append('userId', userId);
                formData.append('file', img);
                const response = await axiosApi.post('/user/newPicture', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                return response
            } catch (e) {
                return e
            }
        },
        getPicture: async (userId: string) => {
            try {
                const response = await axiosApi.post('/user/getPicture', { userId })
                return response.data
            } catch (e) {
                return e
            }
        }
    },
    auth: {
        login: async (login: string, password: string) => {
            try {
                const response = await axiosApi.post('/auth/login', { login, password });
                return response.data;
            } catch (error) {
                return error
            }
        },
        logout: async () => {
            try {
                const response = await axiosApi.post('/user/logout');
                return response.data;
            } catch (err) {
                return { error: err }
            }
        },
        validateToken: async (token: string) => {
            try {
                const response = await axiosApi.post('/auth/validate', { token })
                return response.data
            } catch (err) {
                return { error: err }
            }
        },
        eamilAlreadyUsed: async (email: string) => {
            try {
                const response = await axiosApi.post('/auth/emailAlreadyUsed', { email: email })
                return response.data
            } catch (error) {
                return error
            }
        },
        loginAlreadyExist: async (login: string) => {
            try {
                const response = await axiosApi.post('/auth/loginAlreadyUsed', { login: login })
                return response.data
            } catch (error) {
                return error
            }
        }
    },
    feedback: {
        sendFeedback: async (userId: string, text: string, files: File[]) => {
            try {
                const formData = new FormData();
                formData.append('dest', 'feedback-image')
                formData.append('userId', userId);
                formData.append('text', text);
                files.forEach(file => {
                    formData.append('files', file);
                });
                const response = await axiosApi.post('/feedback/sendFeedback', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                return response
            } catch (error) {
                return error
            }
        },
        recentlyFeedback: async (email: string) => {
            try {
                const response = await axiosApi.post('/feedback/recentFeedback', { email: email })

                return response.data
            } catch (error) {
                return error
            }
        }
    }
})