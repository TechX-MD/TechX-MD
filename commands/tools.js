module.exports = {
    name: "tools",

    execute: async (sock, m) => {

        const text = `
╭━━〔 🛠️ TOOLS COMMANDS 〕━━⬣
┃
┃ 🔗 .shorturl
┃ 🔍 .google
┃ 📚 .wikipedia
┃ 🌦️ .weather
┃ 🧮 .calculator
┃ 🔐 .password
┃ 🔢 .qr
┃ 🔤 .base64
┃ 🔒 .encode
┃ 🔓 .decode
┃ 🌍 .translate
┃ 📱 .ipcheck
┃ 🆔 .uuid
┃ ⏰ .timestamp
┃ 🎨 .font
┃ 📝 .read
┃ 📄 .json
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3
`;

        await sock.sendMessage(
            m.key.remoteJid,
            { text },
            { quoted: m }
        );

    }
};
