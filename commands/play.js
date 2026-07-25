const axios = require("axios");
const yts = require("yt-search");

module.exports = {
    name: "play",
    aliases: ["song"],

    execute: async (sock, m, args) => {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "🎵 Usage:\n.play <song name>\n.song <song name>"
                },
                { quoted: m }
            );
        }

        try {

            await sock.sendMessage(
                m.chat,
                {
                    react: {
                        text: "🎵",
                        key: m.key
                    }
                }
            );

            const search = await yts(query);

            if (!search.videos.length) {
                return sock.sendMessage(
                    m.chat,
                    {
                        text: "❌ Song not found."
                    },
                    { quoted: m }
                );
            }

            const video = search.videos[0];

            await sock.sendMessage(
                m.chat,
                {
                    image: {
                        url: video.thumbnail
                    },
                    caption:
`🎵 *${video.title}*

⏱ ${video.timestamp}
👤 ${video.author.name}

⬇️ Downloading...`
                },
                { quoted: m }
            );

            const apis = [

`https://eliteprotech-apis.zone.id/ytdown?url=${encodeURIComponent(video.url)}&format=mp3`,

`https://api.yupra.my.id/api/downloader/ytmp3?url=${encodeURIComponent(video.url)}`,

`https://okatsu-rolezapiiz.vercel.app/downloader/ytmp3?url=${encodeURIComponent(video.url)}`

            ];

            let download = null;

            for (const api of apis) {

                try {

                    const res = await axios.get(api, {
                        timeout: 60000
                    });

                    if (res.data.downloadURL)
                        download = res.data.downloadURL;

                    else if (res.data.data?.download_url)
                        download = res.data.data.download_url;

                    else if (res.data.dl)
                        download = res.data.dl;

                    if (download) break;

                } catch {}

            }

            if (!download) {

                return sock.sendMessage(
                    m.chat,
                    {
                        text: "❌ Download failed.\nTry again later."
                    },
                    { quoted: m }
                );

            }

            await sock.sendMessage(
                m.chat,
                {
                    audio: {
                        url: download
                    },
                    mimetype: "audio/mpeg",
                    fileName: `${video.title}.mp3`
                },
                { quoted: m }
            );

            await sock.sendMessage(
                m.chat,
                {
                    react: {
                        text: "✅",
                        key: m.key
                    }
                }
            );

        } catch (err) {

            console.log(err);

            sock.sendMessage(
                m.chat,
                {
                    text: "❌ Failed to download music."
                },
                { quoted: m }
            );

        }

    }

};
