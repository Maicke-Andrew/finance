import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Header from "../../Components/Header";
import { AuthContext } from "../../Contexts/Auth/AuthContext";
import imagens from "./imagens";
import { Container, ContainerValue, EditButtons, Items, MidleButtons, MonthButtons, SomeValues } from "./style";
import Edit from '/edit.png';
import filterButton from '/filter.png';
import leftButton from '/left.png';
import plusButton from '/plus.png';
import rightButton from '/right.png';
import Remove from '/trash.png';
import { useTranslation } from 'react-i18next';
import Loading from "../../Components/Loading";

interface IAllItem {
    category: string;
    createAt: string;
    installments: any;
    receive: boolean;
    title: string;
    value: number;
    _id: string;
    id: string;
}

const Home = () => {
    const { i18n } = useTranslation();
    const auth = useContext(AuthContext);
    const lng = window.localStorage.getItem('language') || 'pt';
    const [date, setDate] = useState<any>(moment().format('YYYY/MM'));
    const [receiveTotal, setReceiveTotal] = useState<string>();
    const [spendTotal, setSpendTotal] = useState<string>();
    const [someTotal, setSomeTotal] = useState<string>();
    const [userItem, setUserItem] = useState<any>();
    const [filteredItemUser, setFilteredItemUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        updateItem()
        setTimeout(() => {
            setLoading(false)
        }, 600)
    }, [])

    useEffect(() => {
        if (userItem) {
            filteredItems();
        }
    }, [userItem])

    useEffect(() => {
        if (userItem) {
            filteredItems()
        }
    }, [date])

    useEffect(() => {
        if (filteredItemUser) {
            receiveSome();
            spendSome();
            finalSomeTotal();
        }
    }, [filteredItemUser])

    useEffect(() => {
        const update = async () => {
            if (auth.modalOpen === false && auth.response.message.length > 0) {
                if (auth.response.response === 'success' || auth.response.response === 'error') {
                    toast(auth.response.message, { type: auth.response.response, style: { backgroundImage: 'linear-gradient(to right, #223C5F, #77D1DD, #223C5F)', color: 'white' } })
                }
                auth.responseMessage({ response: '', message: '' })
                const items = await auth.getItems(auth.user!._id, auth.user!.id)
                setUserItem(items)
                updateItem()
            }
        }
        update()
    }, [auth.response])

    const updateItem = async () => {
        const items = await auth.getItems(auth.user!._id, auth.user!.id)
        setUserItem(items)
    }

    const lastMonth = () => {
        setDate(moment(date, "YYYY/MM").subtract(1, 'months').format('YYYY/MM'));
        updateItem();
    }

    const nextMonth = () => {
        setDate(moment(date, "YYYY/MM").add(1, 'months').format('YYYY/MM'));
        updateItem();
    }

    const openModal = () => {
        return auth.modalIsOpen(true);
    }

    const openDeleteModal = (itemId: string) => {
        return auth.deleteModalIsOpen(itemId, true);
    }

    const openEditModal = (item: object) => {
        return auth.editModalIsOpen(item, true)
    }

    const formatValue = (value: number) => {
        const numericValue = value.toString().replace(/\D/g, "");

        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: "decimal",
        }).format(Number(numericValue) / 100);

        if (value.toString().includes('-')) {
            return `- ${formattedValue}`
        }

        return formattedValue
    }

    const filteredItems = () => {
        let reallyItems: any = [];

        if (userItem && userItem.length > 0) {
            userItem.forEach((item: IAllItem) => {
                const monthUser = moment(date).format('MM-YYYY');
                const itemMonth = moment(item.createAt);
                const addNumber = atuallyInstallments(date, item) - 1;
                const itemMonthWithInstallments = moment(itemMonth).add(addNumber, 'months').format('MM-YYYY');

                if (monthUser == itemMonth.format('MM-YYYY') || monthUser == itemMonthWithInstallments) {
                    reallyItems.push(item)
                }
            })
            setFilteredItemUser(reallyItems)
        }
    }

    const receiveSome = () => {
        let allItemReceive: any = [];

        if (filteredItemUser) {
            filteredItemUser?.forEach((item: any) => {
                if (item.receive == true) {
                    return allItemReceive.push(item.value);
                }
            });
        }

        let total = allItemReceive.reduce((total: any, numero: any) => { return total + numero }, 0)

        setReceiveTotal(formatValue(total))
    }

    const spendSome = () => {
        let allItemReceive: any = [];

        if (filteredItemUser) {
            filteredItemUser?.forEach((item: any) => {
                if (item.receive == false) {
                    return allItemReceive.push(item.value);
                }
            });
        }

        let total = allItemReceive.reduce((total: any, numero: any) => { return total + numero }, 0)

        setSpendTotal(formatValue(total))
    }

    const finalSomeTotal = () => {
        let positiviValue: any = [];
        let negativeValue: any = [];

        if (filteredItemUser) {
            filteredItemUser?.forEach((item: any) => {
                if (item.receive == true) {
                    return positiviValue.push(item.value);
                } else if (item.receive == false) {
                    return negativeValue.push(item.value);
                }
            });
        }

        let totalPositive = positiviValue.reduce((total: any, numero: any) => { return total + numero }, 0);
        let totalNegative = negativeValue.reduce((total: any, numero: any) => { return total + numero }, 0);

        let total = totalPositive - totalNegative;

        setSomeTotal(formatValue(total));
    }

    const atuallyInstallments = (date: Date, item: IAllItem) => {
        const argMonth = moment(date).startOf('month');
        const itemMonth = moment(item.createAt).startOf('month');
        const diffInDays = moment(argMonth, 'MM-YYYY').diff(itemMonth, 'days');
        const index = Math.round(diffInDays / 30.44);

        return item.installments[index]
    }

    let a = [0, 1, 2];

    return (
        <Container>
            <Header />
            <SomeValues>
                <ContainerValue >
                    <img src={imagens.thirdImageGreen} />
                    <h1>{i18n.t('money')} {receiveTotal}</h1>
                </ContainerValue>
                <span></span>
                <ContainerValue >
                    <img src={imagens.thirdImageRed} />
                    <h1>{i18n.t('money')} {spendTotal}</h1>
                </ContainerValue>
                <span></span>
                <ContainerValue >
                    {someTotal ?
                        parseInt(someTotal!.replace(/\D/g, "")) > 0 ?
                            (someTotal?.includes('-') ?
                                <>
                                    <img src={imagens.thirdImageTotalRed} />
                                    <h1>{i18n.t('money')} {someTotal.split('- ')[1]}</h1>
                                </>
                                :
                                <>
                                    <img src={imagens.thirdImageTotalGreen} />
                                    <h1>{i18n.t('money')} {someTotal}</h1>
                                </>
                            )
                            :
                            <>
                                <img src={imagens.thirdImageTotal} />
                                <h1>{i18n.t('money')} {someTotal}</h1>
                            </>
                        :
                        <>
                            <img src={imagens.thirdImageTotal} />
                            <h1>{i18n.t('money')} {someTotal}</h1>
                        </>
                    }
                </ContainerValue>
            </SomeValues>
            <MidleButtons>
                <div>
                    <img src={filterButton} style={{ width: '20px' }} />
                </div>
                <MonthButtons>
                    <img src={leftButton} onClick={lastMonth} />
                    {lng === 'pt' ?
                        `${date.split('/')[1]}/${date.split('/')[0]}`
                        :
                        date
                    }
                    < img src={rightButton} onClick={nextMonth} />
                </MonthButtons>
                <div>
                    <img src={plusButton} onClick={openModal} style={{ width: '30px' }} />
                </div>
            </MidleButtons>
            {loading ?
                <Loading widthpx="100vw" heightpx="100vh" />
                :
                filteredItemUser ?
                    filteredItemUser.map((item: any) => {
                        return (
                            <Items key={item._id} style={item.receive ? { borderColor: 'green' } : { borderColor: 'red' }}>
                                <p>{i18n.t(`${item.category.toLowerCase()}`)}</p>
                                <p>{item.title}</p>
                                <p>{i18n.t('money')} {formatValue(item.value)}</p>
                                <p>{item.installments.length > 0 ? `${atuallyInstallments(date, item)}/${item.installments.length}` : '1/1'}</p>
                                <EditButtons>
                                    <img src={Edit} onClick={() => openEditModal(item)} />
                                    <img src={Remove} onClick={() => openDeleteModal(item._id)} />
                                </EditButtons>
                            </Items>
                        )
                    }) : null
            }
            <ToastContainer position="bottom-right" newestOnTop />
        </Container >
    )
}

export default Home

