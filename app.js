var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require("request")

var activity = []
var currStocks = []

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set("view engine", "ejs");

var stocks = require("./request")


app.get("/", function (req, res) {
  res.render("portfolio")
})


app.get("/trading", function (req, res) {
  res.render("trading")
})
app.get("/stock_price", function (req, res) {
  res.render("stock_price")
})
var ticker = async function (symbol) {
  var price = await stocks.getStockData(symbol)
  return price;
}

function buyOrSell(type, symbol, quantity, price){
  var stock = {
      "type": type,
      "symbol": symbol,
      "quantity": quantity,
      "price": price,
    }
  if (type == "buy"){
    activity.push(stock);
    currStocks.push(stock)
  }
  else if (type == "sell") {
    activity.push(stock);
    //TODO: remove the "stock" from currStock
  }
}
app.get("/testEndpoint", function (req, res) {
  var symbol = req.query.symbol;
  var qty = req.query.qty;
  // var stock_price = await stocks.getStockData(symbol);
  // console.log(stock_price);

  // let stock = ticker(symbol);
  let stockPrice;
  request("https://api.iextrading.com/1.0/tops?symbols=" + symbol, function(error, response, body){
    console.log()
    var responseFromIex = JSON.parse(body);
    if(error){
      res.redirect("trading")
      console.log(error)
    
    } 
   else{
  
    stockName = responseFromIex[0].symbol
    buyPrice = responseFromIex[0].bidPrice
    sellPrice = responseFromIex[0].askPrice
<<<<<<< HEAD

    var type = buy;
    var quantity = 1;
    
    this.buyOrSell(type, stockName, quantity, buyPrice)

    
=======
    // var stock = {
    //   stockName: qty
    // }
    console.log(stockName)
>>>>>>> a71b0f19d933caabad2cb0f61cc9d2f7c61ac430

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({price: buyPrice}));
   }
  });
  
})

app.listen(3000, async function () {
  console.log("Server started on PORT 3000")
  // var stock_price = await stocks.getStockData("fb")
  // console.log(stock_price)
})

// app.listen(3000,function(){
//   console.log("Server started on PORT 3000")

//   var apple = stocks.getStockData("aapl")
//   apple.then(function (value) {
//     console.log(value)
        //  dom.updateGraph(value.price)
//   })
//   console.log("HI");
// })

