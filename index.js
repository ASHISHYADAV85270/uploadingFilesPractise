import express from 'express';
import path from 'path';
import multer from 'multer';

// it act as a middleware to handle the file upload location
// const upload = multer({ dest: 'uploads/' });


// There are two options available, destination and filename. They are both functions that determine where the file should be stored.
//agr y nhi krengai toooo currupted aaaigi 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');  // callback function (error, destination)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);  // callback function (error, filename)
    }
});

const upload = multer({ storage: storage });


const PORT = 8000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get('/', (req, res) => { res.render("index") });

//mtlb single file upload krni hai aur name input tag bala hoga
app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file); // req.file is the file but corrupted
    res.redirect("/");
});

app.listen(PORT, () => { console.log(`server started at port ${PORT}`) });
