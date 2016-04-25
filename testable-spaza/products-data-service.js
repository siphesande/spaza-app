exports.getProduct = function(req, res, next){
	req.getServices()
	    .then(function(services){
	    	var Id = req.params.Id;
	    	var productsDataService = services.productDataService;
            productsDataService.getProduct(Id, function(err, product) {
                if (products && products.length > 0){
                    res.render('products', {products : product});
                }
                else{
                    res.render('products', {error : 'Product not found.'})
                }
            })
        .catch(err){
            res.render('products', {error : err});
        };
    });
};