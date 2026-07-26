const {
    handleAntideleteCommand
} = require("../lib/antidelete");

module.exports = {
    name: "antidelete",
    aliases: ["antidel"],

    execute: async (sock, m, args) => {

        const isOwner = true; // replace with your owner checker

        return handleAntideleteCommand(
            sock,
            m.chat,
            m,
            isOwner,
            global.botData,
            global.saveBotData,
            m.sender,
            args
        );

    }
};
