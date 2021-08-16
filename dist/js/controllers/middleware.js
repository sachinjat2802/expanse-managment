"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = exports.S3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
});
exports.S3 = new aws_sdk_1.default.S3();
const isAllowedMimetype = (mime) => ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/x-ms-bmp', 'image/webp'].includes(mime.toString());
const fileFilter = (req, file, callback) => {
    const fileMime = file.mimetype;
    if (isAllowedMimetype(fileMime)) {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.uploadMiddleware = multer_1.default({
    fileFilter, storage: multer_s3_1.default({
        s3: exports.S3,
        bucket: 'moreimage',
        acl: 'public-read',
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        key: function (req, file, callback) {
            const fileName = file.originalname;
            callback(null, fileName);
        }
    })
});
