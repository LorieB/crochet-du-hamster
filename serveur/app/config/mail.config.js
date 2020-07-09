const nodemailer = require('nodemailer');


module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0b9551e48411eb",
        pass: "0005c87f94c022"
    }
})
