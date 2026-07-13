const { plugins } = require("./loader");

async function handler(sock, m) {

    const text =
        m.message?.conversation ||
        m.message?.extendedTextMessage?.text ||
        "";

    if (!text.startsWith(global.prefix)) return;


    const args = text
        .slice(global.prefix.length)
        .trim()
        .split(/ +/);


    const command = args
        .shift()
        .toLowerCase();


    const plugin = plugins.get(command);


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
