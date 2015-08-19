var fs  = require("fs"); 

// two Asyncronous methods:
  //module.exports = function(filePath){

   exports.productsSold = function(filePath){
      var productsSold = [];
      var productMap = {};
      var fileContent = fs.readFileSync(filePath, "utf8");
      var iterms = fileContent.split("\r"); 
          iterms = iterms.splice(1);

      iterms.forEach(function(iterm) {

        var hold = iterm.split(';');
        var productName = hold[2];
        var quantity =Number(hold[3]);
        // console.log("holds :" + JSON.stringify(holds));
          if(productMap[productName] === undefined && productName != "stock item"){
           productsSold.push(productName);
           productMap[productName]= 0;

         }
           productMap[productName]= productMap[productName]+ quantity;
      });

            console.log(JSON.stringify(productMap));
            return productMap;
    };


    //this.mostPopular = function(){
    exports.mostPopular = function(filePath){  
      var mostPopularProduct = {};
      var productsSold = [];
      var productMap = {};
      var fileContent = fs.readFileSync(filePath, "utf8");
      // console.log(fileContent);
      var iterms = fileContent.split("\r"); 
     
      iterms.forEach(function(iterm) {
        var hold = iterm.split(';');
        var popular = hold[2];
        var NumberOfIterms = hold[3];
        // console.log("holds :" + JSON.stringify(holds));
         if(productMap[popular] === undefined && popular != "stock item"){
           productsSold.push(popular);
           productMap[popular]= 0;
        };
         
        productMap[popular]= productMap[popular] + Number(NumberOfIterms);
        
           var max = 0;
           for(var prop in productMap) {
              var value = productMap[prop];
              if(productMap[prop] > max) {
                max = productMap[prop];
                mostPopularProduct = {
                 name : prop,
                 qty: max
              }
           }
         }
     });
          console.log(mostPopularProduct);
          return mostPopularProduct;
     };  