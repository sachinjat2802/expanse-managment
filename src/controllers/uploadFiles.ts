import { Request, Response } from "express";

const uploadFiles = (req: Request, res: Response) => {

    res.status(200);
    return res.json({
        msg: "Uploaded!",
        file: req.file,
    });
}

export default uploadFiles;