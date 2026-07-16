const {
    default: makeWASocket,
    useMultiFileAuthState
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
            "Ubuntu",
            "Chrome",
            "20.0.04"
        ],

        connectTimeoutMs: 120000,

        defaultQueryTimeoutMs: 120000,

        keepAliveIntervalMs: 15000,

        printQRInTerminal: false
    });



    sock.ev.on(
        "creds.update",
        saveCreds
    );



    // Pairing Code
    if (!state.creds.registered) {

        try {

            await new Promise(resolve =>
                setTimeout(resolve, 10000)
            );


            console.log(
                "REQUESTING PAIR CODE:",
                phoneNumber
            );


            const code =
                await sock.requestPairingCode(
                    phoneNumber
                );


            console.log(
                "PAIR CODE GENERATED:",
                code
            );


            global.PAIR_CODES =
                global.PAIR_CODES || {};


            global.PAIR_CODES[phoneNumber] = code;


        } catch (err) {

            console.log(
                "❌ Pairing Error:",
                err
            );

        }

    }




    // Connection Update
    sock.ev.on(
        "connection.update",
        async ({
            connection,
            lastDisconnect
        }) => {


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
                    lastDisconnect?.error
                    ?.output
                    ?.statusCode || 0;


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

                    console.log(
                        "♻️ Restarting connection..."
                    );


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


            if (!m?.message)
                return;



            if (
                m.message.reactionMessage
            )
                return;



            if (
                m.key.remoteJid ===
                "status@broadcast"
            )
                return;



            if (
                m.key.remoteJid
                ?.includes("broadcast")
            )
                return;



            console.log(
                "CHAT:",
                m.key.remoteJid
            );



            try {

                await handler(
                    sock,
                    m
                );

            } catch(err) {

                console.log(
                    "HANDLER ERROR:",
                    err
                );

            }


        }
    );



    return sock;

}



module.exports = connect;
