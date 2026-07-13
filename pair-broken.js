const express = require("express");
const connect = require("./lib/connect");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const users = new Map();

app.post("/pair", async (req,res)=>{

    let number = req.body.number;

    if(!number){
        return res.json({
            status:false,
            message:"Number required"
        });
    }

    number = number.replace(/[^0-9]/g,"");

    if(users.has(number)){
        return res.json({
            status:false,
            message:"Already pairing"
        });
    }

    users.set(number,true);

    try{

        connect(number);

        return res.json({
            status:true,
            message:"Pairing started",
            number
        });

    }catch(err){

        users.delete(number);

        return res.json({
            status:false,
            message:err.message
        });

    }

});


app.get("/code/:number",(req,res)=>{

    const number=req.params.number;

    const code=global.PAIR_CODES?.[number];

    if(!code){

        return res.json({
            status:false,
            message:"Waiting for code..."
        });

    }

    users.delete(number);

    res.json({
        status:true,
        code
    });

});



        return res.json({
            status:false,
            message:err.message
        });

    }

});


app.get("/status",(req,res)=>{

    res.json({
        status:true,
        code
    });

});


app.get("/status",(req,res)=>{
    res.sendFile(
        __dirname + "/public/index.html"
    );

});


app.listen(3000,()=>{

    console.log("🚀 TECHX-MD Pair Web Running :3000");

});
