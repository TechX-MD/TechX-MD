const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");
const handler = require("./handler");
const { loadPlugins } = require("./loader");

loadPlugins();

async function connect() {

    const { state, saveCreds } =
        await useMultiFileAuthState("./session");


    const { version } =
        await fetchLatestBaileysVersion();


   const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "fatal" }),browser: [
        "Ubuntu",
        "Chrome",
        "22.04.4"
    ],
    printQRInTerminal: false
});



    sock.ev.on(
        "creds.update",
        saveCreds
    );



    // Pairing Code
    if (!state.creds.registered) {

        const phoneNumber =
            global.owner.replace(/[^0-9]/g, "");


        setTimeout(async () => {

            try {

                const code =
                    await sock.requestPairingCode(phoneNumber);


                console.log(`
━━━━━━━━━━━━━━━━━━━━━━
📱 TECHX-MD PAIRING CODE

${code}

━━━━━━━━━━━━━━━━━━━━━━
                `);


            } catch (err) {

                console.log(
                    "❌ Pairing Error:",
                    err.message
                );

            }


        }, 10000);

    }



    // Connection Update
    sock.ev.on(
        "connection.update",
        (update) => {

            const {
                connection,
                lastDisconnect
            } = update;



            if (connection === "connecting") {

                console.log(
                    "🔄 Connecting..."
                );

            }



            if (connection === "open") {

                console.log(
                    "✅ TECHX-MD Connected Successfully"
                );

            }



            if (connection === "close") {

                const reason =
                lastDisconnect
                ?.error
                ?.output
                ?.statusCode;


                console.log(
                    "❌ Connection Closed:",
                    reason
                );


                if (
                    reason !== DisconnectReason.loggedOut
                ) {

                    console.log(
                        "♻️ Reconnecting..."
                    );

                    setTimeout(() => {
                        connect();
                    }, 5000);


                } else {

                    console.log(
                        "🚫 Logged out. Delete session folder."
                    );

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

            console.log("📩 NEW MESSAGE");

            await handler(sock, m);

        }
    );


    return sock;

}


module.exports = connect;
