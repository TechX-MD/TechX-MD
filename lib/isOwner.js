const settings = require("../settings");

function isOwner(senderId) {

    let owners = settings.ownerNumber;

    if (!Array.isArray(owners)) {
        owners = [owners];
    }

    owners = owners.map(num =>
        num.replace(/[^0-9]/g, '') + "@s.whatsapp.net"
    );

    return owners.includes(senderId);
}

module.exports = isOwner;
