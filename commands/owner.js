module.exports = {
    name: "owner",

    execute: async (sock, m) => {

        const owner = global.owner;

        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: `👑 Owner Number:\nhttps://wa.me/${owner}`
            },
            {
                quoted: m
            }
        );

    }
};
