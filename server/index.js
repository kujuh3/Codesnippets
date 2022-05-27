const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const dirpath = path.join(__dirname, 'codes');

const port = 3001;

var fs = require('fs');

var data = [];
var descriptions = [];
var minutes = 1, the_interval = minutes*60*1000;

app.set('view engine', 'html');

app.use(fileUpload({
  createParentPath: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Fetch all files and their descriptions */
function readFiles(dirname) {
  data = [];

  /* Firstly fetch all the descriptions for files */
  fs.readFile(dirname + '/descriptions.json', (error, data) =>{
    if(error) {
      console.log(error)
    }
    descriptions = JSON.parse(data);
  });

  /* From directory read each file */
  fs.readdir(dirname + '/', function(err, filenames) {
    if (err) {
      console.log(err)
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + '/' + filename, 'utf-8', function(err, content) {
        let extension = "";
        /* Assign the correct description for a file using filter */
        let desc = descriptions.filter(function(description){ return description.file.toLowerCase() === filename.toLowerCase()})

        if (err) {
            console.log(err)
          return;
        }
        if(filename == "descriptions.json"){
          return;
        }
        /* We'll be also sending a file extension type using split and pop */
        switch(filename.split('.').pop()) {
            case "py": 
            extension = "python"
            break;
            case "js": 
            extension = "javascript"
            break;
        }
        /* Push each files data to an array */
        data.push({content, "name" : filename, extension, "description" : desc[0]});
      });
    });
  });
}

function WriteNewDescription(desc) {
  let obj = require(dirpath + '/descriptions.json');
  obj.push(desc);
  console.log(desc)
  fs.writeFile(dirpath + '/descriptions.json', JSON.stringify(obj), function(err) {
    console.log(err);
  });
}

/* Call function to read all files and then intervally every minute fetch them again. */
readFiles(dirpath);
setInterval(function(){
    readFiles(dirpath);
    console.log("Codes fetched")
}, the_interval)

app.get("/snippets", async (req, res) => {
  res.send({"data" : data});
})

app.post("/newsnippet", async (req, res) => {
  try {
    if(!req.files || descriptions.some(el => el.file === req.files.file.name)) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } else {
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let newFile = req.files.file;
        let newDescription = {
          "name" : req.body.name,
          "file" : req.files.file.name,
          "description" : req.body.description
        };

        WriteNewDescription(newDescription);
        //Use the mv() method to place the file in upload directory (i.e. "uploads")
        newFile.mv('./server/codes/' + newFile.name);
        readFiles(dirpath);
        //send response
        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: newFile.name,
                mimetype: newFile.mimetype,
                size: newFile.size
            }
        });
    }
} catch (err) {
    res.status(500).send(err);
}
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});