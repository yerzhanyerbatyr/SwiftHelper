require('dotenv').config();

module.exports = {
    env: {
        CLIENT_ID:process.env.CLIENTID,
        CLIENT_SECRET:process.env.CLIENTSECRET
    }
}