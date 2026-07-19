
const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const fs = require("fs");

const SETTINGS_FILE = "./database/settings.json";

let settings = JSON.parse(
    fs.readFileSync(SETTINGS_FILE, "utf8")
);

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
        markOnlineOnConnect: false,

        printQRInTerminal: false,

        connectTimeoutMs: 60000,

        defaultQueryTimeoutMs: 60000,

        keepAliveIntervalMs: 15000

    });


    sock.ev.on(
        "creds.update",
        saveCreds
    );
    // Pairing + Connection
    sock.ev.on(
        "connection.update",
        async ({
            connection,
            lastDisconnect,
            qr
        }) => {


            if (
                qr &&
                !state.creds.registered &&
                !global.PAIR_CODES?.[phoneNumber]
            ) {

                try {

                    console.log(
                        "REQUESTING PAIR CODE:",
                        phoneNumber
                    );


                    const code =
                        await sock.requestPairingCode(
                            phoneNumber
                        );


                    global.PAIR_CODES =
                        global.PAIR_CODES || {};


                    global.PAIR_CODES[phoneNumber] =
                        code;


                    console.log(
                        "PAIR CODE:",
                        code
                    );


                } catch (err) {

                    console.log(
                        "❌ Pairing Error:",
                        err.message
                    );

                }

            }



            if (connection === "open") {

               

try {
    await sock.newsletterFollow(
        "0029Vb8QAZyAe5VyFTerO82q@newsletter"
    );

    console.log("✅ TECHX Channel followed");

} catch (err) {
    console.log(
        "❌ Channel follow failed:",
        err.message
    );
} console.log(
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
                    "❌ Connection Closed:",
                    reason
                );


                if (reason !== 401) {

                    console.log(
                        "♻️ Reconnecting..."
                    );


                    setTimeout(() => {

                        connect(phoneNumber)
                            .catch(console.error);

                    }, 5000);

                }

            }


        }
    );
    // Messages Handler
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
                m.key.remoteJid === "status@broadcast"
            )
                return;


            if (
                m.key.remoteJid?.includes("broadcast")
            )
                return;



// AUTO TYPING
if (settings.autotyping) {
    try {
        await sock.sendPresenceUpdate(
            "composing",
            m.key.remoteJid
        );

        await new Promise(resolve => setTimeout(resolve, 2500));

    } catch (e) {
        console.log("AutoTyping:", e.message);
    }
}
// AUTO RECORDING
if (settings.autorecording) {
    await sock.sendPresenceUpdate(
        "recording",
        m.key.remoteJid
    );
}

// AUTO REACT
if (settings.autoreact) {
    await sock.sendMessage(
        m.key.remoteJid,
        {
            react: {
                text: "❤️",
                key: m.key
            }
        }
    );
}
            console.log(
                "CHAT:",
                m.key.remoteJid
            );


            try {

                await handler(
                    sock,
                    m
                );


            } catch (err) {

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
