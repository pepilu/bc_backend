const express = require('express')
const generator = require('generate-password')
const bcrypt = require('bcryptjs')
const Beekeeper = require('../models/beekeeper')
const changePassword = require('../emails/changePassword')

const router = express.Router()

// funkcija za pravljenje novog pcelara koji pre nije postojao 
router.post('/beekeepers', async (req,res) => {
    const beekeeper = new beekeeper(req.body)

    try{
        await beekeeper.save()        
        res.send(beekeeper)
    } catch (e){
        res.status(400).send(e)
    }
})

// brisanje ne postoji?

// funkcija za LOGOVANJE pcelara
router.post('/beekeeper-login', async(req,res)=>{
    const { email, password } = req.body;
    let existingbeekeeper;
    
    try {
        existingbeekeeper = await beekeeper.findOne({ email: email})
    } catch (err) {
        return res.status(404).send()
    }
    
    if(!existingbeekeeper || !bcrypt.compareSync(password, existingbeekeeper.password)){
        return res.status(400).send()
    }

    res.json(existingbeekeeper)
})

//promena lozinke
router.patch('/forgotten-password/:email', async(req, res) => {
    const code = generator.generate({
        length: 8,
        numbers: true
    })
    try{
        const beekeeper = await beekeeper.findOne({ email: req.params.email})
        if (!beekeeper) {
            return res.status(404).send()
        }
        else{
            const existingbeekeeper  = await beekeeper.findOneAndUpdate({email: req.params.email}, {
                $set:{
                    verificationCode: await bcrypt.hash(code, 8),
                    temporaryPassword: await bcrypt.hash(req.body.temporaryPassword, 8)
                }
            }, {upsert: true})
            const email = req.params.email
            changePassword.changePassword(email,code)
            res.send(code)
        }
             
    } catch (e) {
        return res.status(500).send(e)
    }
})

router.patch('/change-password/:email', async(req, res) => {
    try{
        const beekeeper = await beekeeper.findOne({email: req.params.email})

        if(!beekeeper) {
            return res.status(404).send()
        }
        if (bcrypt.compareSync(req.body.verificationCode, beekeeper.verificationCode)){
            newPassword = beekeeper.temporaryPassword;
            await beekeeper.findOneAndUpdate({email: req.params.email}, {
                $set:{                
                    password: newPassword,
                    verificationCode: "",
                    temporaryPassword: ""
                }
            }, {upsert: true})
    
            
            res.send()
        }
        else {return res.status(402).send()}
    } catch (e) {
        return res.status(500).send(e)
    }
})

module.exports=router