const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser');

app.use(cors())

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('We are live');
});

// Route Controller for uploading a single file
app.post('/single', upload.single('singleImage'), (req, res) => {
    try {
        res.status(200).send({ message: 'File uploaded successfully.' });
    } catch (err) {
        res.status(400).send({ message: 'Error uploading file.' });
    }
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})


