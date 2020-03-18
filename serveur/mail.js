let message = {
    from: "",
    to: "contact@crochet-du-hamster.fr",
    subject: "",
    text: "",
    envelope: {
        from: '', // used as MAIL FROM: address for SMTP
        to: 'contact@crochet-du-hamster.fr' // used as RCPT TO: address for SMTP
    }
};


module.exports = function (app, transport) {
    app.post("/contact", function (req, res) {
        message.from = req.body.expediteur;
        message.envelope.from = req.body.expediteur;
        message.subject = req.body.sujet;
        message.envelope.subject = req.body.sujet;
        message.text = req.body.message;

        transport.sendMail(message, (error, info) => {
            if (error) {
                res.status(500).json(error);
            }
            res.json(info);
        });
    });
}