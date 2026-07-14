const axios = require("axios");

module.exports = {
    name: "instagram",

    execute: async (sock, m, args) => {

        const username = args[0];

        if (!username) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Usage:\n.instagram username\n\nExample:\n.instagram realmadrid"
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
                    text: `⏳ Checking Instagram: ${username}`
                },
                {
                    quoted: m
                }
            );


            const response = await axios.post(
                "https://storyviewer.com/api/v1/web/profile",
                {
                    username: username,
                    user_info: true,
                    user_stories: true,
                    user_highlights: true,
                    user_posts: true
                }
            );


            const data = response.data;


            const info = `
╭━━〔 📸 INSTAGRAM 〕━━⬣
┃ 👤 User: ${username}
┃ 📖 Stories: ${data.stories?.length || 0}
┃ 🖼 Posts: ${data.posts?.length || 0}
┃ ⭐ Highlights: ${data.highlights?.length || 0}
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3
`;


            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: info
                },
                {
                    quoted: m
                }
            );


        } catch (err) {

            console.log("Instagram Error:", err.message);

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Instagram API failed"
                },
                {
                    quoted: m
                }
            );

        }

    }
};
