//all of categories search	
    $(document).ready(function(){
        $("#category_search").keyup(function(){
            var searchValue = $("#category_search").val();
            $.get("/categories/search/" + searchValue, function(results){
                $("#categories").html(results)
            })
        })

    });