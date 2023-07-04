import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { AuthContext } from "../../Contexts/Auth/AuthContext";
import { useApi } from '../../hooks/useApi';
import { ModalDelete, Overlay } from './style';
import Atention from '/atention.png'

interface Validation {
    title: string;
    value: string;
    receive: boolean;
    category: string;
    userId: string;
    response: string;
}

const DeleteModal = ({ itemId }: any) => {
    const { i18n: i18n2 } = useTranslation()
    const auth = useContext(AuthContext);
    const api = useApi();

    const closeModal = () => {
        return auth.deleteModalIsOpen('', false);
    }

    const deleteItem = async () => {
        const userId = await auth.user!._id

        if (!userId) {
            auth.responseMessage({ response: 'error', message: i18n.t('userIdMissing') })
            return closeModal()
        }

        if (!itemId) {
            auth.responseMessage({ response: 'error', message: i18n.t('itemNotFound') })
            return closeModal()
        }

        const response: any = await api.items.deleteItem(userId, itemId);

        if (response.status !== 200) {
            auth.responseMessage({ response: 'error', message: i18n.t('errorInApi') })
            return closeModal()
        }

        auth.responseMessage({ response: 'success', message: i18n.t('sucessDelet') })
        return closeModal()
    }

    return (
        <>
            <Overlay />
            <ModalDelete>
                <img src={Atention} />
                <h1>{i18n.t('takeCare')}</h1>
                <div>
                    <button onClick={deleteItem}>{i18n.t('delete')}</button>
                    <button onClick={closeModal}>{i18n.t('cancel')}</button>
                </div>
            </ModalDelete>
        </>
    );
};

export default DeleteModal;