import { createContext } from 'react';
import { User } from '../../types/User';

interface IResponse {
    response: string;
    message: string;
}

export type AuthContextType = {
    user: User | null;
    response: IResponse;
    modalOpen: boolean;
    editModalOpen: boolean;
    deleteModalOpen: boolean;
    login: (login: string, password: string) => Promise<any>;
    loginGoogle: (res: any) => Promise<any>;
    logout: () => void;
    modalIsOpen: (arg: boolean) => void;
    profileModalIsOpen: (arg: boolean) => void;
    deleteModalIsOpen: (itemId: string, arg: boolean) => void;
    editModalIsOpen: (itemId: object, arg: boolean) => void;
    getItems: (userId: any, id: any) => Promise<any[]>;
    responseMessage: (response: IResponse) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);