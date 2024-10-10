import path from 'path'
import fs from 'fs'
import moment from 'moment'
import xlsx from 'xlsx'

const UPLOAD_FOLDER = 'D:/ThienDuck/THIENDUC/SHUB/Backend/src/public/files';
const upLoadFiles = (file)  => {
    if (!file) {
        return {
            errCode: 1
        }
    }
    // console.log(path.extname(file))
    
    // Checking file format
    if (path.extname(file) !== '.xlsx') {
        return {
            errCode: 2
        }
    }
    return {
        errCode: 0,
        data: file
    }
};

const queryFile = (start_time, end_time, totalAmount) => {
    let startTime = moment(start_time, 'HH:mm:ss', true);
    let endTime = moment(end_time, 'HH:mm:ss', true);

    // Checking time format
    if (!startTime.isValid() || !endTime.isValid()) {
        return {
            errCode: 1
        }
    }

    // Getting the newest file in files folder
    const files = fs.readdirSync(UPLOAD_FOLDER);

    if (!files.length) {
        return {
            errCode: 2
        }
    }

    const latestFile = files.reduce((latest, file) => {
        const filePath = path.join(UPLOAD_FOLDER, file);
        const stat = fs.statSync(filePath);
        return stat.mtime > latest.mtime ? { file, mtime: stat.mtime } : latest;
    }, { file: null, mtime: 0 }).file;

    const filePath = path.join(UPLOAD_FOLDER, latestFile);

    // Reading Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    try {
        data.forEach(row => {
            let transactionTime = row.__EMPTY_1; // This is the time column
            let transactionAmount = parseFloat(row.__EMPTY_7); // This is the money column
            
            if (transactionTime >= start_time && transactionTime <= end_time) {
                    totalAmount += transactionAmount;
                }
            });
            return {
                errCode: 0,
                data: totalAmount
            }
    } catch (error) {
        return {
            errCode: 3
        }
    }
}

module.exports = {
    upLoadFiles, queryFile
}