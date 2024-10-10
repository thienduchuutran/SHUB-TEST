import express from 'express'
import homeController from '../controller/homeController'
import fs from 'fs'
import { diskStorage } from "multer";
import multer from 'multer';
import path from 'path';

const router = express.Router()

const UPLOAD_FOLDER = 'D:/ThienDuck/THIENDUC/SHUB/Backend/src/public/files';

if (!fs.existsSync(UPLOAD_FOLDER)) {
    fs.mkdirSync(UPLOAD_FOLDER);
}


// Configure Multer to store files in the public folder
const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER); // Save files in the public/ folder
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Just customizing the file name
    }
});

const fileFilter = (req, file, cb) => {
    // Check the file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.xlsx') {
        cb(null, true); // Accept the file
    } else {
        cb(null, false); // Reject the file
    }
};

const upload = multer({ storage: storage,  fileFilter: fileFilter });

const initWebRoutes = (app) => {
    //path, handler
    router.get("/", homeController.homePage)

    router.post('/upload-file', upload.single('file'), homeController.uploadFiles)
    router.get('/query-total', homeController.queryFile)

    return app.use("/", router)
}

export default initWebRoutes