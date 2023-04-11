const expres = require("express");
const router = expres.Router();

var mysql = require("mysql");
var pool = mysql.createPool
({
    host:"localhost",
    user:"root",
    password:"",
    database:"thecamp_market"
});


router.post("/",(req,res)=>{
    try{

        let s_quantity = req.body.sells_quantity;
        let p_date = req.body.recored_date;
        let tmp = ""
        tmp += p_date
        let splitArr = tmp.split("/")
        let date = ""
        for(let i = splitArr.length-1 ; i >= 0;i--)
        {
            if(i != 0)
                date += splitArr[i] + "/"
            else date += splitArr[i]
        }
        pool.query(
            `insert into thecamp_market_sells (sells_quantity,recored_date) values ("${s_quantity}","${date}")`,
            function(err,result,fields){
                if(err) throw err;
                res.send(result);
            }
        );
    }
    catch(error){
        console.log(error)
        res.status(500).send("Error in sending data")
    }
});

module.exports = router;