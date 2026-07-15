const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
    name: "play",

    execute: async (sock, m, args) => {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "🎵 Use: .play song name"
                },
                { quoted: m }
            );
        }

        try {

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: `🔎 Searching: ${query}...`
                },
                { quoted: m }
            );

            const api = await axios.get(
                `http://localhost:3000/play?q=${encodeURIComponent(query)}`
            );

            if (!api.data.success) {
                return sock.sendMessage(
                    m.key.remoteJid,
                    {
                        text: "❌ Song not found"
                    },
                    { quoted: m }
                );
            }

            const data = api.data;


const filePath = path.join(
    "/data/data/com.termux/files/home/TECHX-API/downloads",
    data.audio.split("/").pop()
);

await sock.sendMessage(
    m.key.remoteJid,
    {
        audio: fs.readFileSync(filePath),
        mimetype: "audio/mpeg",
        fileName: `${data.title}.mp3`
    },
    { quoted: m }
);
        } catch (err) {

            console.log(err);

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Download failed"
                },
                { quoted: m }
            );

        }

    }
};
