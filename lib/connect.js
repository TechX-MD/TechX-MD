const {
    default: makeWASocket,
    useMultiFileAuthState,
} = require("@whiskeysockets/baileys");

const P = require("pino");
const handler = require("./handler");

async function connect(phoneNumber) {

    const { state, saveCreds } =
        await useMultiFileAuthState(
            `./sessions/${phoneNumber}`
        );

    const version = [2, 3000, 1015901307];

    const sock = makeWASocket({

        version,

        auth: state,

        markOnlineOnConnect: false,

        logger: P({
            level: "fatal"
        }),

        browser: [
            "TECHX-MD",
            "Chrome",
            "1.0.0"
        ],

        mobile: false,

        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        keepAliveIntervalMs: 10000,

        printQRInTerminal: false
    });


    sock.ev.on(
        "creds.update",
        saveCreds
    );


    // Pairing Code
    if (!state.creds.registered) {

        try {

            await new Promise(
                resolve => setTimeout(resolve, 3000)
            );

            console.log(
                "REQUESTING PAIR CODE:",
                phoneNumber
            );


            const code =
                await sock.requestPairingCode(phoneNumber);


            console.log(
                "PAIR CODE GENERATED:",
                code
            );


            global.PAIR_CODES =
                global.PAIR_CODES || {};


            global.PAIR_CODES[phoneNumber] = code;


        } catch(err) {

            console.log(
                "❌ Pairing Error:",
                err.message
            );

        }

    }



    // Connection Update
    sock.ev.on(
        "connection.update",
        async ({ connection, lastDisconnect }) => {


            if (connection === "open") {

                console.log(
                    `✅ ${phoneNumber} Connected`
                );

                console.log(
                    "🎉 LOGIN COMPLETE"
                );

            }



            if (connection === "close") {

                const reason =
                    lastDisconnect?.error?.output?.statusCode || 0;


                console.log(
                    "❌ Connection Closed"
                );

                console.log(
                    "CODE:",
                    reason
                );

                console.log(
                    "DETAILS:",
                    lastDisconnect?.error
                );


                if (reason !== 401) {

                    setTimeout(() => {

                        connect(phoneNumber)
                            .catch(console.error);

                    }, 5000);

                }

            }

        }
    );



    // Messages
    sock.ev.on(
        "messages.upsert",
        async ({ messages }) => {


            const m = messages[0];


            if (!m.message) return;


            if (
                m.key.remoteJid === "status@broadcast" ||
                m.key.remoteJid.includes("broadcast")
            ) return;


            console.log(
                "CHAT:",
                m.key.remoteJid
            );


            await handler(
                sock,
                m
            );


        }
    );


    return sock;

}


module.exports = connect;
