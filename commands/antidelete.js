const {
    handleAntideleteCommand
} = require("../lib/antidelete");

module.exports = {
    name: "antidelete",
    aliases: ["antidel"],

    execute: async (sock, m, args) => {

        if (!global.botData) {
            global.botData = {
                antiDelete: {}
            };
        }

        if (!global.botData.antiDelete) {
            global.botData.antiDelete = {};
        }

        if (!global.saveBotData) {
            global.saveBotData = () => {};
        }


        const isOwner = true;


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
