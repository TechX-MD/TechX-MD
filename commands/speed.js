module.exports = {
    name: "speed",

    execute: async (sock, m) => {

        const start = Date.now();

        const msg = await sock.sendMessage(
            m.key.remoteJid,
            {
                text: "⚡ Testing speed..."
            },
            {
                quoted: m
            }
        );

        const end = Date.now();

        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: `
╭━━━〔 ⚡ TECHX-MD PRO 〕━━━⬣
┃
┃ 🚀 Speed Test Complete
┃
┃ ⚡ Response : ${end - start} ms
┃ 🟢 Status   : Online
┃ 🤖 Engine   : Baileys
┃ 📡 Server   : Active
┃
┃ 🔥 Fast & Stable
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3 PRO
                `
            },
            {
                quoted: m
            }
        );

    }
};
