var fs  = require("fs"); 

// two Asyncronous methods:
  module.exports = function(filePath){

this.productsSold = function(callback){
      var productsSold = [];
      var productMap = {};
      var fileContent = fs.readFileSync(filePath, "utf8");
      // console.log(fileContent);
      var iterms = fileContent.split("\r"); 
     
      

      iterms.forEach(function(iterm) {

      var hold = iterm.split(';');

      var productName = hold[2];
      //var NumberOfIterms = hold[3];
      var quantity =Number(hold[3]);
          // console.log("holds :" + JSON.stringify(holds));

        if(productMap[productName] === undefined && productName != "stock item"){
          productsSold.push(productName);
          productMap[productName]= 0;

         }
         //productMap[productName]= productMap[productName] + Number(NumberOfIterms);
  
         productMap[productName]= productMap[productName]+ quantity;
      
     });

            console.log(JSON.stringify(productMap));
            callback(null, productMap); //returns a map of how many of each product is sold - mapping productName to quantity sold.
    };

this.mostPopular = function(callback){
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
         //productMap[productName]= productMap[productName] + Number(NumberOfIterms);
        
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
          callback(null, mostPopularProduct);
          //return mostPopularProduct;
     };  

}
           