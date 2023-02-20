const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

// mūsu loģika būs, ka ik reizi mēs ieejam url:
// /create_txt?veids=RAM&modelis=Corsair%20Vengeance%20LPX%2016GB&cena=99.99
// tiek paņemti dati no linka (query params) un izveidots txt fails
app.get('/create_txt', (req, res) => {

  // rīt turpinām izveidot jaunu txtx failu ar attiecīgo infu
  console.log(req.query);

  res.json('ok')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})