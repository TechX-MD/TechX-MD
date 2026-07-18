const axios = require("axios");

module.exports = {
    name: "ytmp4",

    execute: async (sock, m, args) => {

        const url = args[0];

        if (!url) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Send YouTube link\n\nExample:\n.ytmp4 https://youtu.be/xxxxx"
                },
                { quoted: m }
            );
        }

        try {

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "⏳ Downloading video..."
                },
                { quoted: m }
            );


            const api =
            `https://techx-ap.onrender.com/ytmp4?url=${encodeURIComponent(url)}`;


            const response = await axios.get(api, {
                responseType: "arraybuffer"
            });


            await sock.sendMessage(
                m.key.remoteJid,
                {
                    video: Buffer.from(response.data),
                    caption: "🎬 Downloaded by TECHX-MD"
                },
                { quoted: m }
            );


        } catch (err) {

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Download failed\n" + err.message
                },
                { quoted: m }
            );

        }

    }
};
