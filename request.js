var request = require("request")

function getStockDataAsync(stock) {
    return new Promise((resolve, reject) => {
        request("https://api.iextrading.com/1.0/tops?symbols=" + stock, function(error, response, body){
        if (error) reject(error);
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            resolve(parsedData[0]);
            }
        })
    });
}

module.exports = {
    getStockData: getStockDataAsync
}