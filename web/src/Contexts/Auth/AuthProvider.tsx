import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import DeleteModal from "../../Components/DeleteModal";
import EditModal from "../../Components/EditModal";
import Loading from '../../Components/Loading'
import Modal from "../../Components/Modal";
import ProfileModal from "../../Components/ProfileModal";
import { useApi, axiosApi } from "../../hooks/useApi";
import { User } from "../../types/User";
import { AuthContext } from "./AuthContext"

interface IResponse {
    response: string;
    message: string;
}

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const api = useApi();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
    const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null);
    const [itemId, setItemId] = useState<string>()
    const [itemEdit, setItemEdit] = useState<object>()
    const [loading, setLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<IResponse>({ response: '', message: '' })

    useEffect(() => {
        validateUser();
    }, [])

    const validateUser = async () => {
        const document: any = typeof window !== 'undefined' ? window.document : undefined;

        let token;
        if (document.cookie) {
            token = document.cookie.split('; ')
            if (token) {
                token = token.find((row: string) => row.startsWith('token='))
                if (token) {
                    token = token.split('=')[1];
                }
            }
        }

        if (token) {
            axiosApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
            validateToken()
            setUser({ id: '0', login: '', name: '', surname: '', email: '', pictureUrl: '' })
        }
        validateToken()
        setUser(null)
    }


    const validateToken = async () => {
        const document: any = typeof window !== 'undefined' ? window.document : undefined;

        let token;
        if (document.cookie) {
            token = document.cookie.split('; ')
            if (token) {
                token = token.find((row: string) => row.startsWith('token='))
                if (token) {
                    token = token.split('=')[1];
                }
            }
        }

        if (token) {
            const data = await api.auth.validateToken(token)
            if (data) {
                setUser(data);
            }
        }
        setTimeout(() => setLoading(false), 1000)
    }

    const login = async (login: string, password: string) => {
        const data = await api.auth.login(login, password)

        if (data.user && data.token) {
            setUser(data.user)
            storageToken(data.token)
            return true
        }
        return data
    }

    const loginGoogle = async (res: any) => {
        const data = await api.user.validateGoogle(res)

        if (data.user && data.token) {
            setUser(data.user)
            storageToken(data.token)
            return true
        }

        return data
    }

    const logout = async () => {
        setUser(null);
        storageToken('', true);
        return await api.auth.logout();
    }

    const storageToken = (token: string, remember?: boolean) => {
        document.cookie = `token=${token}; max-age=86400;`
    }

    const modalIsOpen = (arg: boolean) => {
        setModalOpen(arg)
    }

    const getItems = async (userId: any, id: any) => {
        const response = await api.items.getMyItems(userId, id)
        return response
    }

    const responseMessage = (response: IResponse) => {
        setResponse({ response: response.response, message: response.message })
    }

    const deleteModalIsOpen = (itemId: string, arg: boolean) => {
        setItemId(itemId);
        setDeleteModalOpen(arg);
    }

    const editModalIsOpen = (item: object, arg: boolean) => {
        setItemEdit(item);
        setEditModalOpen(arg);
    }

    const profileModalIsOpen = (arg: boolean) => {
        setProfileModalOpen(arg)
    }

    return (
        <AuthContext.Provider value={{ user, response, profileModalIsOpen, editModalIsOpen, modalOpen, login, loginGoogle, logout, modalIsOpen, getItems, responseMessage, deleteModalIsOpen, deleteModalOpen, editModalOpen }}>
            {children}
            {loading && <Loading></Loading>}
            {modalOpen && <Modal></Modal>}
            {deleteModalOpen && <DeleteModal itemId={itemId}></DeleteModal>}
            {editModalOpen && <EditModal item={itemEdit}></EditModal>}
            {profileModalOpen && <ProfileModal></ProfileModal>}
        </AuthContext.Provider>
    )
}