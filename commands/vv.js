const { downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = {
    name: "vv",
    aliases: ["viewonce", "readviewonce"],

    execute: async (sock, m) => {
        const from = m.chat || m.key.remoteJid;

        try {
            await sock.sendMessage(from, {
                react: {
                    text: "👁️",
                    key: m.key
                }
            });

            const quoted =
                m.message?.extendedTextMessage?.contextInfo?.quotedMessage;

            if (!quoted) {
                return await sock.sendMessage(
                    from,
                    {
                        text: "❌ Reply to a View Once image, video or audio."
                    },
                    { quoted: m }
                );
            }

            let content = quoted;

            if (content.ephemeralMessage) {
                content = content.ephemeralMessage.message;
            }

            // Detect all View Once formats
            let message;

            if (content.viewOnceMessageV2) {
                message = content.viewOnceMessageV2.message;
            } else if (content.viewOnceMessageV2Extension) {
                message = content.viewOnceMessageV2Extension.message;
            } else if (content.viewOnceMessage) {
                message = content.viewOnceMessage.message;
            } else if (
                content.imageMessage?.viewOnce ||
                content.videoMessage?.viewOnce ||
                content.audioMessage?.viewOnce
            ) {
                message = content;
            } else {
                console.log(
                    "NOT VIEW ONCE:",
                    JSON.stringify(content, null, 2)
                );

                return await sock.sendMessage(
                    from,
                    {
                        text: "❌ This is not a View Once message."
                    },
                    { quoted: m }
                );
            }

            let media;
            let type;

            if (message.imageMessage) {
                media = message.imageMessage;
                type = "image";
            } else if (message.videoMessage) {
                media = message.videoMessage;
                type = "video";
            } else if (message.audioMessage) {
                media = message.audioMessage;
                type = "audio";
            } else {
                return await sock.sendMessage(
                    from,
                    {
                        text: "❌ Unsupported View Once media."
                    },
                    { quoted: m }
                );
            }

            const stream = await downloadContentFromMessage(media, type);

            let buffer = Buffer.from([]);

            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            if (type === "image") {
                await sock.sendMessage(
                    from,
                    {
                        image: buffer,
                        caption: "✅ View Once Image Recovered"
                    },
                    { quoted: m }
                );
            }

            if (type === "video") {
                await sock.sendMessage(
                    from,
                    {
                        video: buffer,
                        caption: "✅ View Once Video Recovered"
                    },
                    { quoted: m }
                );
            }

            if (type === "audio") {
                await sock.sendMessage(
                    from,
                    {
                        audio: buffer,
                        ptt: media.ptt || false,
                        mimetype: media.mimetype || "audio/ogg; codecs=opus"
                    },
                    { quoted: m }
                );
            }

            await sock.sendMessage(from, {
                react: {
                    text: "✅",
                    key: m.key
                }
            });

        } catch (err) {
            console.error("VV ERROR:", err);

            await sock.sendMessage(
                from,
                {
                    text: "❌ Failed to recover View Once media."
                },
                { quoted: m }
            );
        }
    }
};
