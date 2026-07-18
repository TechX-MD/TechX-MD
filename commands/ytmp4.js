const axios = require("axios");

module.exports = {
    name: "ytmp4",

    execute: async (sock, m, args) => {

        const url = args[0];

        if (!url) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Example:\n.ytmp4 https://youtu.be/xxxx"
                },
                { quoted: m }
            );
        }

        try {

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "⏳ Downloading MP4..."
                },
                { quoted: m }
            );


            const api =
            `https://techx-ap.onrender.com/ytmp4?url=${encodeURIComponent(url)}`;


            const res = await axios.get(api, {
                responseType: "arraybuffer",
                maxContentLength: Infinity,
                maxBodyLength: Infinity
            });


            if (res.headers["content-type"]?.includes("application/json")) {
                return sock.sendMessage(
                    m.key.remoteJid,
                    {
                        text: Buffer.from(res.data).toString()
                    },
                    { quoted: m }
                );
            }


            await sock.sendMessage(
                m.key.remoteJid,
                {
                    video: Buffer.from(res.data),
                    mimetype: "video/mp4",
                    caption: "🎬 TECHX-MD YTMP4"
                },
                { quoted: m }
            );


        } catch (err) {

            console.log(err);

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Error: " + err.message
                },
                { quoted: m }
            );

        }

    }
};
