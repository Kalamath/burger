$(document).on("click", ".eatButton", function () {
    var burgerId = $(this).data("id");
    var eaten = $(this).data("eaten");
    
    var newEaten = {
        devoured: eaten
    };

    $.ajax("/api/burgers/" + burgerId, {
        method: "PUT",
        data: newEaten
    }).then(function () {
        location.reload();
    })
})


//Adding Buttons from Search Bar
$(document).on("click", "#addBurger", function(event) {
    event.preventDefault();
    var newBurgerName = $("#burger_name").val().trim();

    if (newBurgerName) {
        var newBurger = {
            burger_name: newBurgerName
        }

        $.post("/api/burgers", newBurger, function() {
            location.reload();
        })
    } else {
        $("#error").text("Oops, enter a different Burger please.");
    }
})