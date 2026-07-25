const axios = require("axios");

module.exports = {
    name: "apk",
    aliases: ["app"],

    execute: async (sock, m, args) => {

        try {

            const appName = args.join(" ");

            if (!appName) {
                return await sock.sendMessage(
                    m.chat,
                    {
                        text: "📦 Usage:\n.apk <app name>\n\nExample:\n.apk WhatsApp"
                    },
                    { quoted: m }
                );
            }

            await sock.sendMessage(m.chat, {
                react: {
                    text: "⏳",
                    key: m.key
                }
            });

            const { data } = await axios.get(
                "https://api.nexoracle.com/downloader/apk",
                {
                    params: {
                        apikey: "free_key@maher_apis",
                        q: appName
                    },
                    timeout: 60000
                }
            );

            if (!data || data.status !== 200 || !data.result) {
                return await sock.sendMessage(
                    m.chat,
                    {
                        text: "❌ APK not found."
                    },
                    { quoted: m }
                );
            }

            const app = data.result;

            await sock.sendMessage(
                m.chat,
                {
                    image: {
                        url: app.icon
                    },
                    caption:
`📦 *${app.name}*

📅 Last Update: ${app.lastup}
📦 Package: ${app.package}
📏 Size: ${app.size}

⬇️ Downloading APK...`
                },
                { quoted: m }
            );

            const apk = await axios.get(app.dllink, {
                responseType: "arraybuffer",
                timeout: 120000
            });

            await sock.sendMessage(
                m.chat,
                {
                    document: Buffer.from(apk.data),
                    mimetype: "application/vnd.android.package-archive",
                    fileName: `${app.name}.apk`,
                    caption:
`📦 *APK Details*

🔖 Name: ${app.name}
📅 Updated: ${app.lastup}
📦 Package: ${app.package}
📏 Size: ${app.size}

🚀 Powered by TECHX-MD`
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
                    text: "❌ Failed to download APK."
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
