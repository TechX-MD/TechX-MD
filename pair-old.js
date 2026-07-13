const express = require("express");
const connect = require("./lib/connect");

const app = express();

app.use(express.json());

const users = new Map();

app.post("/pair", async (req, res) => {

    let number = req.body.number;

    if (!number) {
        return res.json({
            status: false,
            message: "Number required"
        });
    }

    number = number.replace(/[^0-9]/g, "");

    if (users.has(number)) {
        return res.json({
            status: false,
            message: "This number is already being paired"
        });
    }

    users.set(number, true);

    try {

        await connect(number);

        setTimeout(() => {

            const code = global.PAIR_CODES?.[number];

            users.delete(number);

            if (!code) {
                return res.json({
                    status: false,
                    message: "Pairing code not ready"
                });
            }

            return res.json({
                status: true,
                number,
                code
            });

        }, 10000);


    } catch (err) {

        users.delete(number);

        console.log(err);

        return res.json({
            status: false,
            message: err.message
        });

    }

});


app.get("/", (req, res) => {

    res.send(`
<!DOCTYPE html>
<html>
<head>

<title>TECHX-MD Pairing</title>

<style>

body{
    background:#080808;
    color:white;
    font-family:Arial;
    text-align:center;
    padding:40px;
}

.box{
    max-width:400px;
    margin:auto;
    background:#111;
    padding:25px;
    border-radius:15px;
}

input{
    width:90%;
    padding:12px;
    margin:10px;
    border-radius:8px;
    border:none;
}

button{
    padding:12px 25px;
    border:none;
    border-radius:8px;
    background:#00ff99;
    font-weight:bold;
}

#code{
    margin-top:20px;
    font-size:30px;
    letter-spacing:5px;
}

</style>

</head>

<body>

<div class="box">

<h2>🚀 TECHX-MD PAIRING</h2>

<input id="number" placeholder="2637xxxxxxx">

<br>

<button onclick="pair()">GET CODE</button>

<h3 id="code"></h3>

</div>


<script>

async function pair(){

let number =
document.getElementById("number").value;


let res = await fetch("/pair",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
number:number
})

});


let data = await res.json();


if(data.code){

document.getElementById("code").innerHTML =
data.code;

}else{

document.getElementById("code").innerHTML =
data.message;

}

}

</script>


</body>
</html>
`);

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🌐 Server Running :${PORT}`);
});
