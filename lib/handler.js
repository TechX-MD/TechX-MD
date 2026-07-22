const { plugins } = require("./loader");
const fs = require("fs");

async function handler(sock, m) {

    const msg = m.message;

    console.log(
        "MESSAGE KEYS:",
        Object.keys(msg || {})
    );

    const text =
        msg?.conversation ||
        msg?.extendedTextMessage?.text ||
        msg?.ephemeralMessage?.message?.conversation ||
        msg?.ephemeralMessage?.message?.extendedTextMessage?.text ||
        "";

    console.log(
        "TEXT RECEIVED:",
        text
    );


    if (!text.startsWith(global.prefix))
        return;


    const args = text
        .slice(global.prefix.length)
        .trim()
        .split(/ +/);


    const command = args
        .shift()
        .toLowerCase();


    console.log(
        "COMMAND:",
        command
    );


    // MESSAGE INFO
    m.chat = m.key.remoteJid;

    m.sender =
        m.key.participant ||
        m.key.remoteJid;


    // GROUP INFO
    m.isGroup =
        m.chat.endsWith("@g.us");


    if (m.isGroup) {

        const metadata =
            await sock.groupMetadata(
                m.chat
            );


const admins = metadata.participants
    .filter(p => p.admin)
    .map(p => p.id.split(":")[0] + "@s.whatsapp.net");

// Normalize sender
m.sender = m.sender.split(":")[0] + "@s.whatsapp.net";

// Owner
const owner =
    global.ownerNumber.replace(/[^0-9]/g, "") +
    "@s.whatsapp.net";

m.isOwner = (m.sender === owner);

// User admin
m.isAdmin = admins.includes(m.sender);

// Bot admin

const botId = sock.user.id
    .split(":")[0]
    .replace("@s.whatsapp.net", "")
    .replace("@lid", "");


const botJid = sock.user.id.split(":")[0];

m.isBotAdmin = admins.some(id => {

    const cleanId = id
        .replace("@s.whatsapp.net", "")
        .replace("@lid", "")
        .split(":")[0];

    return cleanId === botJid;

});
console.log("BOT ID:", botId);
console.log("ADMINS:", admins);
console.log("IS BOT ADMIN:", m.isBotAdmin);

} else {

    const owner =
        global.ownerNumber.replace(/[^0-9]/g, "") +
        "@s.whatsapp.net";

    m.isOwner = (m.sender === owner);
    m.isAdmin = false;
    m.isBotAdmin = false;

}

    // MENTION
    m.mentionedJid =
        msg?.extendedTextMessage
        ?.contextInfo
        ?.mentionedJid || [];

    // QUOTED MESSAGE
    const context =
        msg?.extendedTextMessage
        ?.contextInfo;


    if (context?.quotedMessage) {

        m.quoted = {
            sender:
                context.participant
        };

    }


    const plugin =
        plugins.get(command);


    console.log(
        "PLUGIN FOUND:",
        !!plugin
    );


    if (!plugin)
        return;


    try {


        console.log(
            "🚀 EXECUTING:",
            command
        );


        const settings =
            JSON.parse(
                fs.readFileSync(
                    "./database/settings.json",
                    "utf8"
                )
            );


        if (settings.autotyping) {

            await sock.sendPresenceUpdate(
                "composing",
                m.chat
            );

            await new Promise(
                resolve =>
                setTimeout(resolve,2500)
            );

        }


        await plugin.execute(
            sock,
            m,
            args
        );


        console.log(
            "✅ EXECUTED:",
            command
        );


    } catch (err) {


        console.log(
            "❌ COMMAND ERROR:",
            err
        );


    }

}


module.exports = handler;
