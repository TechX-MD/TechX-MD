const { downloadContentFromMessage } = require('@whiskeysockets/baileys');

module.exports = {
    name: "vv",
    aliases: ["viewonce", "vview"],

    execute: async (sock, m, args) => {

        const from = m.chat || m.key.remoteJid;

        try {

            // Reaction
            await sock.sendMessage(from, {
                react: {
                    text: "👁️",
                    key: m.key
                }
            });


            // Get quoted message
            const quoted =
                m.message?.extendedTextMessage?.contextInfo?.quotedMessage;


            if (!quoted) {
                return await sock.sendMessage(
                    from,
                    {
                        text:
`❌ Reply to a View Once image/video/audio.

Example:
.vv`
                    },
                    { quoted: m }
                );
            }


            // Handle ephemeral messages
            let content = quoted;

            if (content.ephemeralMessage) {
                content = content.ephemeralMessage.message;
            }


            // Find View Once message
            const viewOnce =
                content.viewOnceMessageV2 ||
                content.viewOnceMessage;


            if (!viewOnce) {
                return await sock.sendMessage(
                    from,
                    {
                        text:
                        "❌ This is not a View Once message."
                    },
                    { quoted: m }
                );
            }


            const message = viewOnce.message;


            let type = null;
            let media = null;


            if (message.imageMessage) {
                type = "image";
                media = message.imageMessage;
            }

            else if (message.videoMessage) {
                type = "video";
                media = message.videoMessage;
            }

            else if (message.audioMessage) {
                type = "audio";
                media = message.audioMessage;
            }


            if (!type || !media) {

                return await sock.sendMessage(
                    from,
                    {
                        text:
                        "❌ Unsupported View Once media."
                    },
                    { quoted: m }
                );

            }


            // Download media
            const stream =
                await downloadContentFromMessage(
                    media,
                    type
                );


            let buffer = Buffer.from([]);


            for await (const chunk of stream) {

                buffer = Buffer.concat([
                    buffer,
                    chunk
                ]);

            }



            // Send back media

            if (type === "image") {

                await sock.sendMessage(
                    from,
                    {
                        image: buffer,
                        caption:
                        "✅ View Once Image Recovered"
                    },
                    { quoted: m }
                );

            }


            else if (type === "video") {

                await sock.sendMessage(
                    from,
                    {
                        video: buffer,
                        caption:
                        "✅ View Once Video Recovered"
                    },
                    { quoted: m }
                );

            }


            else if (type === "audio") {

                await sock.sendMessage(
                    from,
                    {
                        audio: buffer,
                        mimetype:
                        media.mimetype || "audio/mp4"
                    },
                    { quoted: m }
                );

            }



            // Success reaction
            await sock.sendMessage(from, {
                react: {
                    text: "✅",
                    key: m.key
                }
            });



        } catch (error) {

            console.log(
                "VV COMMAND ERROR:",
                error
            );


            await sock.sendMessage(
                from,
                {
                    text:
                    "❌ Failed to recover View Once media."
                },
                { quoted: m }
            );

        }

    }
};
