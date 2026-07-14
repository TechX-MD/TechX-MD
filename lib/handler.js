const { plugins } = require("./loader");

console.log(JSON.stringify(m.message, null, 2));
async function handler(sock, m) {





const msg = m.message;


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

console.log("PLUGIN FOUND:", !!plugin);

if (!plugin) return;

    try {

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
