"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uploadFiles = (req, res) => {
    res.status(200);
    return res.json({
        msg: "Uploaded!",
        file: req.file,
    });
};
exports.default = uploadFiles;
