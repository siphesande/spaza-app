
$(document).ready(function(){
        $("#search").keyup(function(){
            var searchValue = $("#search").val();
            $.get("/products/search/" + searchValue, function(results){
                $("#searchProduct").html(results)
                 alert("Load was performed,")
            });

                if(searchValue.length === 0){
                   location.reload();
                  
            };
        })

    });
//all of categories search	
    $(document).ready(function(){
        $("#category_search").keyup(function(){
            var searchValue = $("#category_search").val();
            $.get("/categories/search/" + searchValue, function(results){
                $("#categories").html(results)
                 alert("Load was performed,")
            });

                if(searchValue.length === 0){
                  location.reload();
                  
            };
        })

    });
