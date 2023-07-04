import { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import { AuthContext } from "../../Contexts/Auth/AuthContext";
import { useApi } from '../../hooks/useApi';
import Loading from '../Loading';
import { ButtonClose, ImageDrop, ModalComplet, Overlay } from './style';

const ProfileModal = () => {
    const auth = useContext(AuthContext);
    const api = useApi();
    const { i18n: i18n2 } = useTranslation();
    const [userImg, setUserImg] = useState<string>('');
    const [loading, setLoading] = useState<boolean>()

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: 'image/*' as any
    });

    useEffect(() => {
        const takePicture = async () => {
            const response: any = await api.user.getPicture(auth.user!.id)
            setUserImg(response.pictureUrl)
        }
        takePicture()
    }, [auth.response.message.includes('Image')])

    useEffect(() => {
        if (acceptedFiles.length > 0) {
            const changePicture = async () => {
                setLoading(true)
                const response: any = await api.user.newPicture(auth.user!.id, acceptedFiles[0])
                if (response.status === 201) {
                    auth.responseMessage({ response: 'success', message: i18n.t('sucessImageChange') })
                    return closeModal()
                } else {
                    auth.responseMessage({ response: 'error', message: i18n.t('errorInApi') })
                    return closeModal()
                }
            };
            changePicture();
        }
    }, [acceptedFiles]);

    const closeModal = () => {
        setLoading(false)
        return auth.profileModalIsOpen(false);
    }

    return (
        <>
            <Overlay />
            <ModalComplet>
                {loading ?
                    <Loading widthpx={'20%'} heightpx={'50%'} />
                    :
                    <>
                        <ButtonClose onClick={closeModal}>
                            <div>
                                <div></div>
                            </div>
                        </ButtonClose>
                        <ImageDrop imgUrl={userImg}>
                            <section className="container">
                                <div {...getRootProps({ className: 'dropzoneStyle' })}>
                                    <input {...getInputProps()} />
                                    <p>{i18n.t('pictureText')}</p>
                                </div>
                            </section>
                        </ImageDrop>
                    </>}
            </ModalComplet>
        </>
    );
};

export default ProfileModal;