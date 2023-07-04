import Header from "../../Components/Header"
import { BtnFile, Container } from "./style"
import { useDropzone } from 'react-dropzone';
import { useCallback, useContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "../../Contexts/Auth/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

interface IFile {
    id: number;
    name: string;
    size: number;
}

interface IFilesArray {
    id: number;
    file: File;
}

const FeedBack = () => {
    const auth = useContext(AuthContext);
    const api = useApi();
    const { i18n: i18n2 } = useTranslation()
    const [text, setText] = useState<string>('')
    const [filesName, setFilesName] = useState<IFile[]>([])
    const [files, setFiles] = useState<IFilesArray[]>([])
    const [canSend, setCanSend] = useState<boolean>(true)

    useEffect(() => {
        const howManyFeedback = async () => {
            const response: any = await api.feedback.recentlyFeedback(auth.user!.email)
            if (response.todayItems >= 3) {
                setCanSend(false)
            } else {
                setCanSend(true)
            }
        }
        howManyFeedback()
    }, [])

    useEffect(() => {
        if (auth.modalOpen === false && auth.response.message.length > 0) {
            if (auth.response.response === 'success' || auth.response.response === 'error') {
                toast(auth.response.message, { type: auth.response.response, style: { backgroundImage: 'linear-gradient(to right, #223C5F, #77D1DD, #223C5F)', color: 'white' } })
            }
            auth.responseMessage({ response: '', message: '' })
        }
    }, [auth.response])

    const handleDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            setFiles(prevFiles => [...prevFiles, { id: Date.now() + file.size, file: file }]);
            setFilesName(prevFiles => [...prevFiles, { id: Date.now() + file.size, name: file.name, size: file.size }]);
        })
    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*' as any,
        multiple: true,
        onDrop: handleDrop
    });

    const deleteImg = (id: number) => {
        console.log(filesName)
        console.log(files)
        setFilesName(filesName.filter((item) => item.id !== id))
        setFiles(files.filter((item) => item.id !== id))
        console.log(filesName)
        console.log(files)
    }

    const sendFeedBack = async () => {
        const feedbackCount: any = await api.feedback.recentlyFeedback(auth.user!.email)

        const userId = auth.user!.id
        const sendFiles: File[] = files.reduce((result: File[], item) => {
            result.push(item.file)
            return result;
        }, []);

        if (feedbackCount.todayItems >= 5) {
            return auth.responseMessage({ response: 'success', message: i18n.t('manyFeedbacks') })
        }

        const response: any = await api.feedback.sendFeedback(userId, text, sendFiles)

        if (response.status !== 201) {
            return auth.responseMessage({ response: 'success', message: i18n.t('errorInApi') })
        }

        auth.responseMessage({ response: 'success', message: i18n.t('sucessFeedback') })
        return cleanEverything()
    }

    const cleanEverything = () => {
        setText('')
        setFilesName([])
        setFiles([])
    }

    return (
        <Container>
            <Header />
            <p>{i18n.t('feedbackText')}</p>
            <textarea onChange={e => setText(e.target.value)} value={text} />
            <BtnFile>
                <section className="container">
                    <div {...getRootProps({ className: 'dropzoneStyle' })}>
                        <input {...getInputProps()} />
                        <p>{i18n.t('pictureText')}</p>
                    </div>
                </section>
                <button onClick={sendFeedBack}>{i18n.t('save')}</button>
            </BtnFile>
            {filesName && filesName.map((file) => {
                return (
                    <>
                        <li key={file.id}>{`${file.name} - ${file.size} bytes   `}<button onClick={() => { deleteImg(file.id) }}>delete</button></li>
                    </>
                )
            })}
            <ToastContainer position="bottom-right" newestOnTop />
        </Container>
    )
}

export default FeedBack