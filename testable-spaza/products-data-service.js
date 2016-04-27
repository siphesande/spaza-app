var Promise = require("bluebird");
exports.getProduct = function (req, res, next) {
        req.getServices()
        .then(function(services){

                var productDataService = services.productDataService;
                Promise.join(productDataService.Products() , productDataService.Categories(),
                          function(products,categories){
                          res.render('products', {
                          products: products,
                          categories: categories

                });
            })
            .catch(function(err){
              next(err);
            });
        });
    };
