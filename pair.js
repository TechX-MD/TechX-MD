const express = require("express");
const connect = require("./lib/connect");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const users = new Map();
const activeConnections = new Map();
app.post("/pair", async (req, res) => {

    let number = req.body.number;

    if (!number) {
        return res.json({
            status: false,
            message: "Number required"
        });
    }

    number = number.replace(/[^0-9]/g, "");


if (activeConnections.has(number)) {
    return res.json({
        status:false,
        message:"Already connected"
    });
}
    if (users.has(number)) {
        return res.json({
            status: false,
            message: "Already pairing"
        });
    }

activeConnections.set(number, true);
users.set(number, true);


try {


connect(number)
.then(()=>{
    console.log("Connection started:", number);
})
.catch(err=>{
    activeConnections.delete(number);
    console.log("Connect Error:", err.message);
});

    return res.json({
        status:true,
        message:"Pairing started",
        number
    });

} catch(err) {

    users.delete(number);

    return res.json({
        status:false,
        message:err.message
    });

}



});


app.get("/code/:number", (req, res) => {

    const number = req.params.number;

    const code = global.PAIR_CODES?.[number];

    if (!code) {

        return res.json({
            status: false,
            message: "Waiting for code..."
        });

    }

    users.delete(number);

    return res.json({
        status: true,
        code
    });

});


app.get("/status", (req, res) => {

    res.json({
        status: "online",
        activePairs: users.size,
        time: new Date()
    });

});


app.get("/", (req, res) => {

    res.sendFile(
        __dirname + "/public/index.html"
    );

});


app.get("/reset/:number", (req, res) => {
    users.delete(req.params.number);

    if (global.PAIR_CODES) {
        delete global.PAIR_CODES[req.params.number];
    }

    res.json({
        status: true,
        message: "Pairing reset"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 TECHX-MD Pair Web Running :${PORT}`);
});
