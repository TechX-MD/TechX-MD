const { plugins } = require("./loader");
const fs = require("fs");
async function handler(sock, m) {

    const msg = m.message;

console.log("MESSAGE KEYS:", Object.keys(msg || {}));
    const text =
        msg?.conversation ||
        msg?.extendedTextMessage?.text ||
        msg?.ephemeralMessage?.message?.conversation ||
        msg?.ephemeralMessage?.message?.extendedTextMessage?.text ||
        "";

    console.log("TEXT RECEIVED:", text);

    if (!text.startsWith(global.prefix)) return;


    const args = text
        .slice(global.prefix.length)
        .trim()
        .split(/ +/);


    const command = args
        .shift()
        .toLowerCase();


    console.log("COMMAND:", command);


    const plugin = plugins.get(command);

if (m.chat.endsWith("@g.us")) {
    const metadata = await sock.groupMetadata(m.chat);

    const admins = metadata.participants
        .filter(p => p.admin)
        .map(p => p.id);

    m.isGroup = true;

    m.isAdmin = admins.includes(
        m.sender
    );

    const botJid = sock.user.id.split(":")[0] + "@s.whatsapp.net";

    m.isBotAdmin = admins.includes(
        botJid
    );
} else {
    m.isGroup = false;
    m.isAdmin = false;
    m.isBotAdmin = false;
}


    console.log("PLUGIN FOUND:", !!plugin);


    if (!plugin) return;


try {

    const settings = JSON.parse(
        fs.readFileSync("./database/settings.json", "utf8")
    );

    if (settings.autotyping) {
        try {
            await sock.sendPresenceUpdate(
                "composing",
                m.key.remoteJid
            );

            await new Promise(resolve =>
                setTimeout(resolve, 2500)
            );

        } catch (err) {
            console.log("AutoTyping Error:", err.message);
        }
    }

    await plugin.execute(
        sock,
        m,
        args
    );


    } catch (err) {

        console.log(
            "Command Error:",
            err
        );

    }

}

module.exports = handler;
