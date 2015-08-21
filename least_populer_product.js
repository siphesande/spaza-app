var fs = require("fs");
var itemsSold  = require("./most_popular");
//module.exports = function(){

//this.leastPopularProduct = function(filepath){
exports.leastPopularProduct = function(filepath){
  //var newItemsSold = new itemsSold(filepath);
    //var productMap = newItemsSold.productsSold(filepath);
    var productMap = itemsSold.productsSold(filepath);
     var  leastPopularProduct ={};
        var min = 172;
           for(var prod in productMap) {
              var value = productMap[prod];
              if(productMap[prod] < min) {
                min = productMap[prod];
                leastPopularProduct = {
                 Name : prod,
                 qty: min
                 
              }
           }
         }
     
          console.log(leastPopularProduct);
          return leastPopularProduct;
     };  

  //}