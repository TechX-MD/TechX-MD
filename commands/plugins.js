module.exports = {
    name: "plugins",

    execute: async (sock, m) => {

        const text = `
╭━━━〔 🔌 TECHX-MD PLUGINS 〕━━━⬣
┃
┃ 🟢 .alwaysonline
┃ 📖 .autostatus
┃ 👀 .autoread
┃ ✍️ .autotyping
┃ 🎙️ .autorecording
┃ ❤️ .autoreact
┃ 📥 .autodownload
┃ 📸 .autoview
┃ 📝 .autobio
┃ 🛡 .antidelete
┃ 🚫 .antilink
┃ 👥 .antitag
┃ 🚷 .antispam
┃ 👋 .welcome
┃ 👋 .goodbye
┃ 🔒 .anticall
┃ 🔇 .mute
┃ 🔊 .unmute
┃ ⚙️ .plugins
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3 PRO
👑 Owner: Kelly
`;

        await sock.sendMessage(
            m.key.remoteJid,
            {
                image: {
                    url: "https://up6.cc/2026/07/178402176851411.jpeg"
                },
                caption: text
            },
            {
                quoted: m
            }
        );

    }
};
