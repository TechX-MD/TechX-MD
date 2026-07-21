module.exports = {
    name: "groupinfo",

    execute: async (sock, m) => {

        if (!m.isGroup)
            return sock.sendMessage(
                m.chat,
                { text: "❌ This command works only in groups." },
                { quoted: m }
            );


        const metadata =
            await sock.groupMetadata(
                m.chat
            );


        const admins =
            metadata.participants
            .filter(
                p => p.admin
            ).length;


        const members =
            metadata.participants.length;


        const text = `
╭━━〔 👥 GROUP INFO 〕━━⬣
┃ 📌 Name:
┃ ${metadata.subject}
┃
┃ 👤 Members:
┃ ${members}
┃
┃ 👑 Admins:
┃ ${admins}
┃
┃ 🆔 ID:
┃ ${m.chat}
╰━━━━━━━━━━━━━━⬣
`;


        await sock.sendMessage(
            m.chat,
            {
                text
            },
            {
                quoted: m
            }
        );

    }
};
