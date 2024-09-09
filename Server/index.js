//const mysql = require('mysql');

const express = require('express');

const app = express();
const port = 3001;
const Root_Folder = 'D:/Teaching/16. Angular and React/Homework/HW 9';


app.use('/', express.static(Root_Folder));
app.use('/assets', express.static(Root_Folder + '/Client/dist/assets'));

// const connect = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   pass: '123456',
//   database: 'test'
// });

app.get('/', (req,res) => {
    res.status(200).sendFile(
        'Client/dist/index.html',
    {root: Root_Folder})
})

app.post('/', (req, res) => {
    res.status(200);

    console.log("Go to DB"); 

    // connect.query(
    //     'SELECT * FROM test',
    //     (error, result) => {

    //         if(error){
    //             console.log(error);
    //         }

    //         console.log("Request from DB", result.rows);

    //         res.setHeader('Content-Type', 'application/json');

    //         res.end(JSON.stringify(result));
    //     }
    // );

    console.log("It's the end");
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}.`)
  });