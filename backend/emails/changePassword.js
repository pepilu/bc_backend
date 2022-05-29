const nodemailer = require('nodemailer');


const changePassword = (email, code) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAIL_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: "Verifikacioni kod",
        html: "<b>" + code + "</b>", 
    };
    
    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            throw err
    })
}

module.exports = {
    changePassword,
}