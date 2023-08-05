// server.js
const express = require('express');
const { Payment } = require("./main.js")
const ethers = require('ethers')
const app = express();
const paymentProccesorJson = require('../frontend/src/contracts/paymentProccesor.json')
const cors = require('cors')

app.use(cors())

const urls = {
  '1': {id: 1, url: "verysecret.download.com" },
  '2': {id: 2, url: "verysecret.gerdownload.com" },
  '3': {id: 3, url: "verysegrecret.dowgfdnload.com" },
  '4': {id: 4, url: "verysetgregcret.dow dsnload.com" },
  '5': {id: 5, url: "verysecret3.v3download.com" }
}

app.get('/getPaymentId/:itemId', async  function(req, res) {
    const paymentId = (Math.random() * 10000).toFixed(0);
    await Payment.create({
        id: req.params.itemId,
        payid: paymentId,
        isPaid: false
    })
    res.json({ paymentId })
});

app.get('/getProduct/:paymentId', async  function(req,res){
    const payment = await Payment.findOne({ payid: req.params.paymentId  });

    if(payment && payment.isPaid === true){
      res.json({ url: urls[payment.id].url  });
    }else{
      res.json({ url: '' });
    }
})

app.listen(3258,() =>{
  console.log("server running on port 3258")
})


const listenToEvents = () => {
    const provider = new ethers.JsonRpcProvider('http://127.0.0.1:9545')
    const networkId = '5777'  

    const contract = new ethers.Contract(
        paymentProccesorJson.networks[networkId].address,
        paymentProccesorJson.abi,
        provider
    )

    contract.on('PaymentDone', async (from, to, payid, amount, date) => {
       console.log(`
        from:  ${from}
        to: ${to}
        amount: ${amount}
         `)

       const payment = await Payment.findOne({ payid })
       payment.isPaid = true
       await payment.save()
    })
}

listenToEvents();

