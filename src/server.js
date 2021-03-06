const express    = require('express');
const nodemailer = require("nodemailer");
const app        = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('public'));
app.use(express.json())

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req,res)=>{
    console.log(req.body)
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
       
    })

    const mailContent ={
        from: req.body.email,
        to: process.env.EMAIL_USER,
        subject: `Contato Inicial | ${req.body.name}`,
        text: req.body.mensagem
    }

    transport.sendMail(mailContent,(error,info)=>{
        if (error) {
            console.log(error);
            res.send('erro');
        }else{
            console.log('Email enviado');
            res.send('success')
        }
    })
})

app.listen(PORT,()=>{
    console.log( `Server running on port ${PORT}`)
})