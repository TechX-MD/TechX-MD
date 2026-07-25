const axios = require("axios");
const yts = require("yt-search");

module.exports = {
    name: "play",
    aliases: ["song"],

    execute: async (sock, m, args) => {

        const query = args.join(" ");

        if (!query) {
            return await sock.sendMessage(
                m.chat,
                {
                    text: "🎵 Usage:\n.play <song name>\n.song <song name>"
                },
                { quoted: m }
            );
        }

        try {

            await sock.sendMessage(m.chat, {
                react: {
                    text: "🎵",
                    key: m.key
                }
            });

            const search = await yts(query);

            if (!search.videos.length) {
                return await sock.sendMessage(
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
                    image: { url: video.thumbnail },
                    caption:
`🎵 *${video.title}*

👤 ${video.author.name}
⏱ ${video.timestamp}

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
                        timeout: 60000,
                        headers: {
                            "User-Agent": "Mozilla/5.0"
                        }
                    });

                    if (res.data?.downloadURL)
                        download = res.data.downloadURL;

                    else if (res.data?.data?.download_url)
                        download = res.data.data.download_url;

                    else if (res.data?.dl)
                        download = res.data.dl;

                    if (download) {
                        console.log("DOWNLOAD:", download);
                        break;
                    }

                } catch (e) {
                    console.log("API Failed:", api);
                }

            }

            if (!download) {

                return await sock.sendMessage(
                    m.chat,
                    {
                        text: "❌ Failed to get download link."
                    },
                    { quoted: m }
                );

            }

            const audioRes = await axios.get(download, {
                responseType: "arraybuffer",
                timeout: 120000,
                maxRedirects: 5,
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "*/*"
                }
            });

            const audioBuffer = Buffer.from(audioRes.data);

            if (!audioBuffer || audioBuffer.length < 50000) {
                throw new Error("Downloaded file is invalid.");
            }

            await sock.sendMessage(
                m.chat,
                {
                    audio: audioBuffer,
                    mimetype: "audio/mpeg",
                    fileName: `${video.title.replace(/[\\/:*?"<>|]/g, "")}.mp3`,
                    ptt: false
                },
                { quoted: m }
            );

            await sock.sendMessage(m.chat, {
                react: {
                    text: "✅",
                    key: m.key
                }
            });

        } catch (err) {

            console.log(err);

            await sock.sendMessage(
                m.chat,
                {
                    text: "❌ Failed to download music.\n" + err.message
                },
                { quoted: m }
            );

            await sock.sendMessage(m.chat, {
                react: {
                    text: "❌",
                    key: m.key
                }
            });

        }

    }
};
