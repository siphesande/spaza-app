var itemsSold  = require("./categoryTotals");
//module.exports = function(){

//this.leastPopularCategory = function(filepath){
   exports.leastPopularCategory = function(filepath){
  //var newItemsSold = new itemsSold(filepath);
    // finding the mininmum item
    var categoryMap = itemsSold.categoryTotals(filepath);
        var leastPopularCat = {};
        var min = 328;
           for(var cat in categoryMap) {
              var value = categoryMap[cat];
              if(categoryMap[cat] < min) {
                min = categoryMap[cat];
                leastPopularCategory = {
                 Name : cat,
                 qty: min
              }
           }
         }
     
          console.log(leastPopularCategory);
          return leastPopularCategory;
     };  

  //}