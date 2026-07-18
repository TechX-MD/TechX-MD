const axios = require("axios");

module.exports = {
    name: "ytmp4",

    execute: async (sock, m, args) => {

        const url = args[0];

        if (!url) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Send YouTube link\n\nExample:\n.ytmp4 https://youtube.com/watch?v=xxxx"
                },
                {
                    quoted: m
                }
            );
        }


        try {

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "⏳ Downloading video..."
                },
                {
                    quoted: m
                }
            );


            const api =
            `https://techx-ap.onrender.com/ytmp4?url=${encodeURIComponent(url)}`;


            const res = await axios.get(api);


            if (!res.data || !res.data.url) {
                return sock.sendMessage(
                    m.key.remoteJid,
                    {
                        text: "❌ Video download failed."
                    },
                    {
                        quoted: m
                    }
                );
            }


            await sock.sendMessage(
                m.key.remoteJid,
                {
                    video: {
                        url: res.data.url
                    },
                    caption:
                    "🎬 Downloaded by TECHX-MD"
                },
                {
                    quoted: m
                }
            );


        } catch (err) {

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text:
                    "❌ Error: " + err.message
                },
                {
                    quoted: m
                }
            );

        }

    }
};
