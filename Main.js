const express = require("express");
const app = express();
const product_path = require("./market/product");
const sell_path = require("./market/sells");

app.use(express.json());
app.use("/market/products",product_path);
app.use("/market/sells",sell_path);

app.listen(5000,"localhost",()=>{
    console.log("Server is listening on port 5000");
})

