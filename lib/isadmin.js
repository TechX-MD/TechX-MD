async function isAdmin(sock, chatId, senderId) {

    // Private chat = no admin needed
    if (!chatId.endsWith('@g.us')) {
        return true;
    }


    try {

        const metadata = await sock.groupMetadata(chatId);

        const participants = metadata.participants;


        const user = participants.find(
            p =>
                p.id === senderId ||
                p.jid === senderId ||
                p.lid === senderId
        );


        if (!user) {
            return false;
        }


        return (
            user.admin === "admin" ||
            user.admin === "superadmin"
        );


    } catch (error) {

        console.log(
            "isAdmin error:",
            error
        );

        return false;
    }
}


module.exports = isAdmin;
