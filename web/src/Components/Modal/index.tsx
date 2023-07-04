import { useContext, useState } from 'react';
import up from '/inOnModal.png';
import upBlack from '/inOnModalBlack.png';
import down from '/outOnModal.png';
import downBlack from '/outOnModalBlack.png';
import { AuthContext } from "../../Contexts/Auth/AuthContext";
import { useApi } from '../../hooks/useApi';
import { ButtonClose, ColumnModal, ModalComplet, Overlay, ReceiveButton, SelectButton, TitleAndCloes } from './style';
import i18n from '../../../i18n';
import { useTranslation } from 'react-i18next';

interface Validation {
    title: string;
    value: string;
    receive: boolean;
    category: string;
    userId: string;
    response: string;
}

const Modal = () => {
    const auth = useContext(AuthContext);
    const api = useApi();
    const { i18n: i18n2 } = useTranslation()
    const [title, setTitle] = useState<string>();
    const [value, setValue] = useState<string>();
    const [receive, setReceive] = useState<boolean>();
    const [installments, setInstallments] = useState<number>();
    const [category, setCategory] = useState<string>();
    const [cashIn, setCashIn] = useState<boolean>(false);
    const [cashOut, setCashOut] = useState<boolean>(false);
    const [validation, setValidation] = useState<Validation>({
        title: '',
        value: '',
        receive: false,
        category: '',
        userId: '',
        response: ''
    });

    const closeModal = () => {
        return auth.modalIsOpen(false);
    }

    const validateItem = () => {
        if (!title) {
            return setValidation((object) => { return { ...object, title: 'Required field' } });
        } else {
            setValidation((object) => { return { ...object, title: '' } });
        }

        if (!value) {
            return setValidation((object) => { return { ...object, value: 'Required field' } });
        } else {
            setValidation((object) => { return { ...object, value: '' } });
        }

        if (!category) {
            return setValidation((object) => { return { ...object, category: 'Required field' } });
        } else {
            setValidation((object) => { return { ...object, category: '' } });
        }

        const userInstallments = []

        for (let i = 0; i < installments!; i++) {
            userInstallments.push(i + 1)
        }

        let userValue = value.replace(/\D/g, '');

        const item = {
            title: title,
            value: userValue,
            receive: receive,
            installments: userInstallments,
            category: category,
            userId: auth.user!.id
        }

        return sendNewItem(item)
    }

    const sendNewItem = async (item: object) => {
        try {
            const id = await auth.user!._id

            if (!id) {
                return 'without id'
            }

            const response: any = await api.items.registerItem(id, item)

            if (response.status !== 200) {
                auth.responseMessage({ response: 'error', message: i18n.t('errorInApi') })
                return setValidation((object) => { return { ...object, response: response.message } });
            }

            auth.responseMessage({ response: 'success', message: i18n.t('sucessCreated') })
            return closeModal()
        } catch (e) {
            return e
        }
    }

    const handleInput = (value: any) => {
        const numericValue = value.replace(/\D/g, "");
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(numericValue / 100);
        setValue(formattedValue);
    };

    const handleCashIn = () => {
        setReceive(true)
        setCashOut(false)
        setCashIn(!cashIn)
    }

    const handleCashOut = () => {
        setReceive(false)
        setCashIn(false)
        setCashOut(!cashOut)
    }

    return (
        <>
            <Overlay />
            <ModalComplet>
                <TitleAndCloes>
                    <ButtonClose onClick={closeModal}>
                        <div>
                            <div></div>
                        </div>
                    </ButtonClose>
                    <p>{i18n.t('newTransaction')}</p>
                </TitleAndCloes>
                <ColumnModal>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder={`${i18n.t('title')}`}
                        onKeyDown={e => { if (e.key === 'Enter') validateItem() }}
                    />
                    {validation.title && <p style={{ color: 'red', margin: 0 }}>{validation.title}</p>}
                    <input
                        value={value}
                        onChange={e => handleInput(e.target.value)}
                        placeholder={`${i18n.t('value')}`}
                        onKeyDown={e => { if (e.key === 'Enter') validateItem() }}
                    />
                    {validation.value && <p style={{ color: 'red', margin: 0 }}>{validation.value}</p>}
                </ColumnModal>
                <ReceiveButton>
                    <button onClick={handleCashIn} style={{ backgroundColor: `${cashIn ? '#58C506' : ''}` }}>
                        <img src={cashIn ? upBlack : up} />
                        {i18n.t('cashIn')}
                    </button>
                    <button onClick={handleCashOut} style={{ backgroundColor: `${cashOut ? '#E12D2D' : ''}` }}>
                        <img src={cashOut ? downBlack : down} />
                        {i18n.t('cashOut')}
                    </button>
                    {validation.receive && <p style={{ color: 'red', margin: 0 }}>{validation.receive}</p>}
                </ReceiveButton>
                <SelectButton>
                    {
                        cashOut ?
                            <select value={installments} onChange={e => setInstallments(parseInt(e.target.value))}>
                                <option value="" disabled selected>0</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            :
                            <select value={0} onChange={e => setInstallments(0)} disabled>
                                <option value="0" disabled selected>0</option>
                            </select>
                    }
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="" disabled selected>{i18n.t('category')}</option>
                        <option value="Health">{i18n.t('health')}</option>
                        <option value="Maintenance">{i18n.t('maintenance')}</option>
                        <option value="Bills">{i18n.t('bills')}</option>
                    </select>
                </SelectButton>
                {validation.response && <p style={{ color: 'red', margin: 0 }}>{JSON.stringify(validation.response)}</p>}
                <button onClick={validateItem}>{i18n.t('createItem')}</button>
            </ModalComplet>
        </>
    );
};

export default Modal;