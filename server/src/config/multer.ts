import { S3Client } from '@aws-sdk/client-s3'
import multer from "multer";
import multerS3 from 'multer-s3';
import dotenv from 'dotenv'

dotenv.config()

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || '',
        secretAccessKey: process.env.AWS_SECRET_KEY || ''
    }
})

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'finance-web-app',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req: any, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req: any, file, cb) => {
            const time = new Date();
            const formatedTime = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}_${time.getHours()}-${time.getMinutes()}-${time.getSeconds()}`;
            cb(null, `${req.body.dest}/${formatedTime}_${file.originalname}`)
        }
    })
})

export default upload;