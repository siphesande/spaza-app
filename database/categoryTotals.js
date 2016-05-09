
var fs  = require("fs"); 

var itemsSold  = require("./most_popular");
//module.exports = function(){

  //this.categoryTotals = function(filepath){
  exports.categoryTotals = function(filename){
   
      var productCategoryMap = {

         'Milk 1l':'Dairy products',
         'Imasi':'Dairy products',
         'Bread':'carbohydrates food',
         'Chakalaka Can':'Canned food',
         'Gold Dish Vegetable Curry Can':'Canned food',
         'Fanta 500ml':'Drinks & ice',
         'Coke 500ml':'Drinks & ice',
         'Cream Soda 500ml':'Drinks & ice',
         'Iwisa Pap 5kg':'carbohydrates food',
         'Top Class Soy Mince':'Canned food',
         'Shampoo 1 litre':'Cosmetics products',
         'Soap Bar': 'Cosmetics products',
         'Bananas - loose':'Fruits products',
         'Apples - loose':'Fruits products',
         'Mixed Sweets 5s':'Sweets products',
         'Heart Chocolates':'Sweets products',
         'Rose (plastic)':'Romantic gifts',
         'Valentine Cards':'Romantic gifts'
      };


   // var newItemsSold = new itemsSold(filepath);
   // var productMap = newItemsSold.productsSold();
    var productMap = itemsSold.productsSold(filename);
    var categoryMap={};       
    for (var productName in productMap) {
         var categoryName = productCategoryMap[productName];
         var qty = productMap[productName];
         if (categoryMap[categoryName]=== undefined){
             categoryMap[categoryName]=0
         };
    categoryMap[categoryName]= categoryMap[categoryName] + qty;

    };
  console.log (categoryMap);
  return categoryMap;
  };  

   
//}



















           