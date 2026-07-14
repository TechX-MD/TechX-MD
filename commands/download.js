module.exports = {
    name: "download",

    execute: async (sock, m) => {

        const text = `
╭━━〔 🎵 DOWNLOADER COMMANDS 〕━━⬣
┃
┃ 🎬 .ytmp4
┃ 🎵 .ytmp3
┃ 🔍 .ytsearch
┃ 🎶 .song
┃ 📱 .tiktok
┃ 📸 .instagram
┃ 📘 .facebook
┃ 🐦 .twitter
┃ 🎧 .spotify
┃ ☁️ .soundcloud
┃ 📌 .pinterest
┃ 📂 .mediafire
┃ 📦 .apk
┃ ▶️ .play
┃ ⬇️ .video
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
