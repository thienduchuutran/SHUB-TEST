import userServices from '../service/backendService' 

const uploadFiles = (req, res) => {
    let file = req.file
    let result = userServices.upLoadFiles(file.originalname)

    if(result.errCode === 1){
        return res.status(400).json({ error: 'No file uploaded' });
    }
    if(result.errCode === 2){
        return res.status(400).json({ error: 'Invalid file format. Only .xlsx allowed' });
    }
    return res.status(200).json({ message: 'File uploaded successfully', filename: result.data });
}

const queryFile = (req, res) => {
    let { start_time, end_time } = req.query;
    let totalAmount = 0
    let result = userServices.queryFile(start_time, end_time, totalAmount)

    if(result.errCode === 1){
        return res.status(400).json({ error: 'Invalid time format. Use hours-minutes-seconds' });
    }
    if(result.errCode === 2){
        return res.status(400).json({ error: 'No file uploaded yet' });
    }
    if(result.errCode === 3){
        return res.status(500).json({ error: 'Error processing file: ' + error.message });
    }
    if(result.errCode === 4){
        return res.status(400).json({ error: 'Start time and end time must be reasonable' });
    }

    return res.status(200).json({ total_amount: result.data });
};

const homePage = (req, res) => {
    res.render('home.ejs')
}


module.exports = {
    uploadFiles, queryFile, homePage
}