module.exports = {
    name: "ai",

    execute: async (sock, m) => {

        const text = `
╭━━〔 🤖 AI COMMANDS 〕━━⬣
┃
┃ 🧠 .ai
┃ 💬 .chat
┃ ✍️ .write
┃ 📝 .rewrite
┃ 🌍 .translateai
┃ 📚 .summary
┃ 💡 .idea
┃ 🎵 .lyricsai
┃ 🎨 .imagine
┃ 💻 .codeai
┃ 🐞 .debugai
┃ 📖 .story
┃ 🎤 .songai
┃ ⚡ .prompt
┃
╰━━━━━━━━━━━━━━━━⬣

🤖 Powered by TECHX-MD AI
`;

        await sock.sendMessage(
            m.key.remoteJid,
            { text },
            { quoted: m }
        );

    }
};
