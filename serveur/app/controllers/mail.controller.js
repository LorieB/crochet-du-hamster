const transport = require("../config/mail.config");


let message = {
    from: "",
    to: "contact@crochet-du-hamster.fr",
    subject: "",
    text: "",
    envelope: {
        from: '',
        to: 'contact@crochet-du-hamster.fr'
    }
};



exports.contact = (req, res) => {
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
}