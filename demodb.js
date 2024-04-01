const sqlite3 = require("sqlite3");
const demoDB = new sqlite3.Database("./databases/demo.db");


demoDB.all(`SELECT * FROM teste`, (err, info) =>{
    console.log(err, info)
});