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


const code = await sock.requestPairingCode(phoneNumber);

console.log("PAIR CODE GENERATED:", code);

global.PAIR_CODES = global.PAIR_CODES || {};
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



    // Connection Update
    sock.ev.on(
        "connection.update",
        ({ connection, lastDisconnect }) => {


            if (connection === "open") {

                console.log(
                    `✅ ${phoneNumber} Connected`
                );

            }


if (connection === "open") {
    console.log(`✅ ${phoneNumber} Connected`);
    console.log("🎉 LOGIN COMPLETE");
}
    const reason =
        lastDisconnect?.error?.output?.statusCode;

    console.log(
        `❌ ${phoneNumber} Disconnected:`,
        reason
    );    

    if (reason !== 401) {
        setTimeout(() => {
            connect(phoneNumber);
        }, 150000);
    }

}

        }
    );


// Messages
sock.ev.on(
    "messages.upsert",        async ({ messages }) => {

            const m = messages[0];

            if (!m.message) return;


            console.log(
                `📩 ${phoneNumber} MESSAGE`
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
