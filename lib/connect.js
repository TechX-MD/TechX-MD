const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const P = require("pino");
const handler = require("./handler");

async function connect(phoneNumber) {

    const { state, saveCreds } =
        await useMultiFileAuthState(
            `./sessions/${phoneNumber}`
        );

    const { version } =
        await fetchLatestBaileysVersion();


    const sock = makeWASocket({

        version,

        auth: state,

        logger: P({
            level: "fatal"
        }),

        browser: [
            "Ubuntu",
            "Chrome",
            "22.04.4"
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


            const code =
                await sock.requestPairingCode(phoneNumber);


            console.log("PAIR CODE GENERATED:", code);


            global.PAIR_CODES =
                global.PAIR_CODES || {};


            global.PAIR_CODES[phoneNumber] = code;


            console.log(`
━━━━━━━━━━━━━━━━━━━━━━
📱 TECHX-MD PAIRING CODE

${code}

━━━━━━━━━━━━━━━━━━━━━━
`);

        } catch(err) {

            console.log(
                "❌ Pairing Error:",
                err.message
            );

        }

    }



    // Always Online
    setInterval(() => {

        if (global.autoOnline) {

            sock.sendPresenceUpdate(
                "available"
            );

        }

    }, 60000);



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


                if (global.autoOnline) {

                    await sock.sendPresenceUpdate(
                        "available"
                    );

                }

            }



            if (connection === "close") {

                const reason =
                    lastDisconnect?.error?.output?.statusCode;


                console.log(
                    `❌ ${phoneNumber} Disconnected:`,
                    reason
                );


                if (reason !== 401) {

                    setTimeout(() => {

                        connect(phoneNumber);

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


            // Auto Read
            if (global.autoRead) {

                await sock.readMessages([
                    m.key
                ]);

            }


            // Auto React
            if (global.autoReact) {

                await sock.sendMessage(
                    m.key.remoteJid,
                    {
                        react:{
                            text:
                            global.reactEmoji || "🔥",
                            key:m.key
                        }
                    }
                );

            }


            // Auto Typing
            if (global.autoTyping) {

                await sock.sendPresenceUpdate(
                    "composing",
                    m.key.remoteJid
                );

            }


            await handler(
                sock,
                m
            );


        }
    );


    return sock;

}


module.exports = connect;
