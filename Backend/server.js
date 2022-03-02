const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3001;
const cors = require("cors");
app.use(cors());
const  {PythonShell}= require('python-shell');



app.listen(PORT, () => { 
    console.log("Successfully started server at: " + PORT);

});

const funstrtodict = async (strlist,dictlist) => {
    strlist.forEach(async (element) => {
        let res1 = await JSON.parse(element);
        dictlist.push(res1)
    });
    
    }
    
    const funct1 = (callback) => {
        PythonShell.run('scraper.py', null, function (err,res) {
        if (err){ throw err;  }
        return callback(res);
      });
    }
    
app.post('/scrapper', (req,res)=>{
    
})