const express = require('express')
const fs = require('fs');

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
})

// mūsu loģika būs, ka ik reizi mēs ieejam url:
// /create_txt?veids=RAM&modelis=Corsair%20Vengeance%20LPX%2016GB&cena=99.99
// tiek paņemti dati no linka (query params) un izveidots txt fails
app.get('/create_txt', (req, res) => {

  // rīt turpinām izveidot jaunu txtx failu ar attiecīgo infu
  console.log(req.query);

  // req.query = { veids: 'RAM', modelis: 'Corsair Vengeance LPX 16GB', cena: '99.99' }
  // ram_corsair_vengeance_lpx_16gb.txt

  // izveidojam faila nosaukumu
  const fileName = (`${req.query.veids}_${req.query.modelis}`).toLowerCase().replaceAll(" ", "_")
  // izveidojam saturu kuru liksim failā
  const fileContent = `-Personālā datora sastāvdaļa-
Veids: ${req.query.veid}
Modelis: ${req.query.modelis}
Cena: ${req.query.cena} EUR
`
  // izmantojam nodejs metodi lai izveidotu failu
  fs.writeFileSync(`${__dirname}/public/txt/${fileName}.txt`, fileContent);

  // pasakam lai beigās šis fails tiek lejupielādēts
  res.download(`${__dirname}/public/txt/${fileName}.txt`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

