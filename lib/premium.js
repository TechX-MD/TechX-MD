const fs = require("fs");

const FILE = "./database/premium.json";

function getPremium() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]");
    }

    return JSON.parse(
        fs.readFileSync(FILE, "utf8")
    );
}

function isPremium(number) {

    const users = getPremium();

    return users.includes(
        number.replace(/[^0-9]/g, "")
    );

}

function addPremium(number) {

    let users = getPremium();

    number = number.replace(/[^0-9]/g, "");

    if (!users.includes(number)) {
        users.push(number);
    }

    fs.writeFileSync(
        FILE,
        JSON.stringify(users, null, 2)
    );

}

function removePremium(number) {

    let users = getPremium();

    number = number.replace(/[^0-9]/g, "");

    users = users.filter(
        x => x !== number
    );

    fs.writeFileSync(
        FILE,
        JSON.stringify(users, null, 2)
    );

}

module.exports = {
    isPremium,
    addPremium,
    removePremium,
    getPremium
};
