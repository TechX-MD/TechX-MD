module.exports = {
    name: "eval",

    execute: async (sock, m, args) => {

        if (!m.key.fromMe) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Owner only command."
                },
                { quoted: m }
            );
        }

        try {

            const code = args.join(" ");

            let result = await eval(code);

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: `✅ Result:\n\n${result}`
                },
                { quoted: m }
            );

        } catch (err) {

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: `❌ Error:\n${err.message}`
                },
                { quoted: m }
            );

        }

    }
};
