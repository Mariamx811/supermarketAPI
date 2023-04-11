const express = require("express");
const router = express.Router();

var mysql = require("mysql");
var pool = mysql.createPool
({
    host:"localhost",
    user:"root",
    password:"",
    database:"thecamp_market"
});


router.get("/",(req,res)=>
{
    try
    {
        pool.query(
            'select * from thecamp_market',
            function(error,results,fields){
                if(error) throw error;
                res.send(results);
            }
        )
    }
    catch
    {
        res.status(500).send("Error in retrieving data");
    }
});

router.post("/",(req,res)=>{
    try{

        let p_name = req.body.product_name;
        let p_value = req.body.product_value;
        let p_quantity = req.body.product_quantity;
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
            `insert into thecamp_market (product_name,product_value,product_quantity,recored_date) values ("${p_name}","${p_value}","${p_quantity}","${date}")`,
            function(err,result,fields){
                if(err) throw err;
                res.send(result);
            }
        );
    }
    catch{
        res.status(500).send("Error in sending data")
    }
});

router.patch("/:id",(req,res)=>{
    try{
        let id = req.query["id"];
        let p_name = req.body.product_name;
        let p_value = req.body.product_value;
        let p_quantity = req.body.product_quantity;
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
            `update thecamp_market set product_name = "${p_name}", product_value = "${p_value}" , product_quantity = "${p_quantity}",recored_date = "${date}" where id = "${id}"`,
            
            function(err,result,fields)
            {
                if(err) throw err
                res.send(result)
            }
        )
    }
    catch{
        res.status(500).send("Error in Updating data");
    }

});

router.delete("/:id",(req,res)=>{
    let id = req.query["id"];

    pool.query(
        `delete from thecamp_market where id = "${id}"`,
        function(err,result,fields)
        {
            if(err) throw err
            res.send(result)
        }
    )
});

module.exports = router;

