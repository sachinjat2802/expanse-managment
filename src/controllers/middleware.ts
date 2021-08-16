import AWS from 'aws-sdk';
import multer, { FileFilterCallback } from "multer"
import multerS3 from "multer-s3";
import { Request } from 'express';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});
export const S3 = new AWS.S3();
const isAllowedMimetype = (mime: string) => ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/x-ms-bmp', 'image/webp'].includes(mime.toString());
const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    const fileMime = file.mimetype;
    if (isAllowedMimetype(fileMime)) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}
export const uploadMiddleware = multer({
    fileFilter, storage: multerS3({
        s3: S3,
        bucket: 'moreimage',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req: Request, file: any, callback: any) {
            const fileName = file.originalname;
            callback(null, fileName);
        }
    })
})