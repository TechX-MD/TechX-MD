const axios = require("axios");
const yts = require("yt-search");

const APIS = [
    "https://apis.davidcyriltech.my.id/download/ytmp3?url=",
    "https://api.giftedtech.web.id/api/download/ytmp3?url="
];

module.exports = {
    name: "song",
    aliases: ["play", "music"],

    execute: async (sock, m, args) => {

        const from = m.chat || m.key.remoteJid;
        const query = args.join(" ").trim();

        if (!query) {
            return sock.sendMessage(
                from,
                {
                    text:
`🎵 *Song Downloader*

Usage:
.song <song name>
.play <song name>
.song <YouTube URL>`
                },
                { quoted: m }
            );
        }

        try {

            await sock.sendMessage(from, {
                react: {
                    text: "⏳",
                    key: m.key
                }
            });

            let video = null;
            let url = query;

            if (
                !query.includes("youtube.com") &&
                !query.includes("youtu.be")
            ) {

                const result = await yts(query);

                if (!result.videos.length) {
                    return sock.sendMessage(
                        from,
                        {
                            text: "❌ No song found."
                        },
                        { quoted: m }
                    );
                }

                video = result.videos[0];
                url = video.url;

            }

            if (video) {

                await sock.sendMessage(
                    from,
                    {
                        image: {
                            url: video.thumbnail
                        },
                        caption:
`🎵 *${video.title}*

⏱ ${video.timestamp}

Downloading audio...`
                    },
                    { quoted: m }
                );

            }

            let downloadUrl = null;
            let title = video?.title || "song";

            for (const api of APIS) {

                try {

                    const res = await axios.get(
                        api + encodeURIComponent(url),
                        {
                            timeout: 30000
                        }
                    );

                    const data = res.data;

                    downloadUrl =
                        data?.result?.download_url ||
                        data?.result?.downloadUrl ||
                        data?.result?.url ||
                        data?.url ||
                        data?.link;

                    title =
                        data?.result?.title ||
                        title;

                    if (downloadUrl) break;

                } catch {}

            }

            if (!downloadUrl) {
                throw new Error("Download link not found.");
            }

            // Download audio as Buffer
            const audio = await axios.get(
                downloadUrl,
                {
                    responseType: "arraybuffer",
                    timeout: 120000,
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity
                }
            );

            const buffer = Buffer.from(audio.data);

            await sock.sendMessage(
                from,
                {
                    audio: buffer,
                    mimetype: "audio/mpeg",
                    fileName: title + ".mp3",
                    ptt: false
                },
                { quoted: m }
            );

            await sock.sendMessage(from, {
                react: {
                    text: "✅",
                    key: m.key
                }
            });

        } catch (err) {

            console.error("SONG ERROR:", err);

            await sock.sendMessage(
                from,
                {
                    text:
                    "❌ Failed to download song."
                },
                { quoted: m }
            );

        }

    }
};
