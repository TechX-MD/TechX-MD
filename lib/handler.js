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


m.isGroup =
    m.chat.endsWith("@g.us");


// OWNER CHECK
const ownerNumber =
    global.ownerNumber.replace(/[^0-9]/g, "");

const senderNumber =
    m.sender
    .split(":")[0]
    .replace("@lid", "")
    .replace("@s.whatsapp.net", "")
    .replace(/[^0-9]/g, "");

m.isOwner =
    senderNumber === ownerNumber;

console.log(
    "OWNER CHECK:",
    {
        sender: senderNumber,
        owner: ownerNumber,
        result: m.isOwner
    }
);


// GROUP INFO
if (m.isGroup) {

    const metadata =
        await sock.groupMetadata(
            m.chat
        );

    console.log(
        "PARTICIPANTS:",
        metadata.participants.map(p => ({
            id: p.id,
            admin: p.admin
        }))
    );


    const admins = [];

    for (const p of metadata.participants) {

        if (p.admin) {

            admins.push(
                p.id.split(":")[0]
            );

        }

    }

const botJid =
    sock.user.id.split(":")[0];


m.isAdmin =
    admins.some(id =>
        id.includes(
            m.sender.split(":")[0]
        )
    );


console.log("BOT CHECK:", {
    bot: botJid,
    admins: admins,
    result: m.isBotAdmin
});



const botNumber =
    global.ownerNumber.replace(/[^0-9]/g, "");

m.isBotAdmin =
    admins.some(id => {

        const clean =
            id.replace("@lid", "")
              .replace("@s.whatsapp.net", "");

        return clean === botNumber;

    }) || sock.user.id.includes(botNumber);


console.log("BOT NUMBER:", botNumber);
console.log("ADMINS:", admins);
console.log("IS BOT ADMIN:", m.isBotAdmin);} else {

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


// ================================
// SMART ANTIBOT WITH WARNING
// ================================

global.antibot = global.antibot || {};
global.antibotWarn = global.antibotWarn || {};

if (
    m.isGroup &&
    global.antibot[m.chat] &&
    !m.isAdmin &&
    !m.isOwner
) {

    const botCommands = [
        "menu",
        "allmenu",
        "alive",
        "ping",
        "runtime",
        "owner",
        "repo",
        "script",
        "status",
        "system",
        "vv",
        "tagall",
        "hidetag",
        "broadcast",
        "bc"
    ];


    if (botCommands.includes(command)) {

        const key =
            m.chat + ":" + m.sender;


        global.antibotWarn[key] =
            (global.antibotWarn[key] || 0) + 1;


        if (global.antibotWarn[key] === 1) {

            await sock.sendMessage(
                m.chat,
                {
                    text:
`⚠️ *ANTI BOT WARNING*

@${m.sender.split("@")[0]}

Bot commands are not allowed here.

Warning: 1/2`,
                    mentions: [m.sender]
                },
                { quoted: m }
            );

            return;
        }


        if (global.antibotWarn[key] >= 2) {

            await sock.sendMessage(
                m.chat,
                {
                    text:
`🚫 *ANTI BOT ACTION*

@${m.sender.split("@")[0]}
Removed for repeated bot activity.`,
                    mentions: [m.sender]
                },
                { quoted: m }
            );


            await sock.groupParticipantsUpdate(
                m.chat,
                [m.sender],
                "remove"
            );


            delete global.antibotWarn[key];

            return;
        }

    }

}


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
