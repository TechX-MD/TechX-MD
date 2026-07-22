const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const fs = require("fs");
const P = require("pino");
const handler = require("./handler");

const USERS_FILE = "./database/users.json";

function getUsers() {

    if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(
            USERS_FILE,
            "{}"
        );
    }

    return JSON.parse(
        fs.readFileSync(
            USERS_FILE,
            "utf8"
        )
    );

}

async function connect(phoneNumber) {

    const {
        state,
        saveCreds
    } = await useMultiFileAuthState(
        `./sessions/${phoneNumber}`
    );

    const {
        version
    } = await fetchLatestBaileysVersion();

    console.log("BAILEYS VERSION:", version);

    const sock = makeWASocket({

        version,

        auth: state,

        logger: P({
            level: "silent"
        }),

browser: [
    "Ubuntu",
    "Chrome",
    "22.04.4"
],

        printQRInTerminal: false,

        markOnlineOnConnect: true,

        syncFullHistory: false,

        connectTimeoutMs: 60000,

        defaultQueryTimeoutMs: 60000,

        keepAliveIntervalMs: 15000

    });

    sock.ev.on(
        "creds.update",
        saveCreds
    );

    sock.ev.on(
        "connection.update",
        async ({
            connection,
            lastDisconnect
        }) => {

            console.log(
                "CONNECTION:",
                connection
            );

            if (
                connection === "connecting" &&
                !state.creds.registered &&
                !global.PAIR_CODES?.[phoneNumber]
            ) {

                try {

                    await new Promise(resolve =>
                        setTimeout(resolve, 5000)
                    );

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

                console.log(
                    `✅ ${phoneNumber} Connected`
                );

                console.log(
                    "🎉 LOGIN COMPLETE"
                );

                try {

                    await sock.sendMessage(
                        `${phoneNumber}@s.whatsapp.net`,
                        {
                            text: "✅ TECHX-MD Connected Successfully 🔥"
                        }
                    );

                } catch (e) {

                    console.log(
                        "WELCOME MSG:",
                        e.message
                    );

                }

            }

            if (connection === "close") {

                console.log(
                    "LAST DISCONNECT:",
                    lastDisconnect
                );

                const reason =
                    lastDisconnect?.error?.output?.statusCode || 0;

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

            if (!m?.message) return;

            if (m.key.remoteJid === "status@broadcast") return;

            if (m.key.remoteJid?.includes("broadcast")) return;

            if (m.message.reactionMessage) return;

            // ANTILINK
            const text =
                m.message?.conversation ||
                m.message?.extendedTextMessage?.text ||
                "";

            if (
                global.antilink?.[m.key.remoteJid] &&
                text.includes("chat.whatsapp.com")
            ) {

                try {

                    const metadata =
                        await sock.groupMetadata(
                            m.key.remoteJid
                        );

                    const admins =
                        metadata.participants
                        .filter(p => p.admin)
                        .map(p => p.id);

                    const sender =
                        m.key.participant || m.key.remoteJid;

                    if (!admins.includes(sender)) {

                        await sock.sendMessage(
                            m.key.remoteJid,
                            {
                                delete: m.key
                            }
                        );

                        await sock.groupParticipantsUpdate(
                            m.key.remoteJid,
                            [sender],
                            "remove"
                        );

                    }

                } catch (err) {

                    console.log(
                        "ANTILINK:",
                        err.message
                    );

                }

            }

           

// ===== ANTISPAM =====
global.antispam = global.antispam || {};
global.spam = global.spam || {};

if (m.isGroup && global.antispam[m.key.remoteJid]) {

    const sender =
        m.key.participant || m.key.remoteJid;

    if (!global.spam[sender]) {
        global.spam[sender] = {
            count: 0,
            time: Date.now()
        };
    }

    const data = global.spam[sender];

    if (Date.now() - data.time > 10000) {
        data.count = 0;
        data.time = Date.now();
    }

    data.count++;

    if (data.count >= 5) {

        try {

            const metadata =
                await sock.groupMetadata(
                    m.key.remoteJid
                );

            const admins =
                metadata.participants
                .filter(p => p.admin)
                .map(p => p.id);

            if (!admins.includes(sender)) {

                await sock.sendMessage(
                    m.key.remoteJid,
                    {
                        text:
                        `🚨 @${sender.split("@")[0]} removed for spamming.`,
                        mentions: [sender]
                    }
                );

                await sock.groupParticipantsUpdate(
                    m.key.remoteJid,
                    [sender],
                    "remove"
                );

            }

        } catch (e) {

            console.log(
                "ANTISPAM:",
                e.message
            );

        }

        delete global.spam[sender];

    }

}
 const users = getUsers();

            const user =
                users[m.key.remoteJid];

            if (user?.autotyping) {

                try {

                    await sock.sendPresenceUpdate(
                        "composing",
                        m.key.remoteJid
                    );

                    await new Promise(resolve =>
                        setTimeout(resolve, 3000)
                    );

                    await sock.sendPresenceUpdate(
                        "available",
                        m.key.remoteJid
                    );

                } catch (err) {

                    console.log(
                        "AutoTyping:",
                        err.message
                    );

                }

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
