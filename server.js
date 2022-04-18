const express = require('express');
const path = require('path');
const fileupload = require("express-fileupload");

let _path = path.join(__dirname, 'public'); 
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(_path, 'index.html'));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(_path, 'editor.html'));
});

app.post('/upload', (req, res) => {
    let image = req.files.image;
    let date = new Date();

   let imageName =  date.getDate() + date.getTime() + image.name;
   let imagePath = `public/uploads/${imageName}`;

   image.mv(imagePath, (err, result) => {
       if(err) throw err
       else res.json(`/uploads/${imageName}`);
   })
})

app.get('/admin', (req, res) => {
    res.sendFile(path.join(_path, 'dashboard.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(_path, 'login.html'));
})

app.get('/:blog', (req, res) => {
   res.sendFile(path.join(_path, 'blog.html'))
})

app.get('/:blog/editor', (req, res) => {
   res.sendFile(path.join(_path, 'editor.html'))
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})