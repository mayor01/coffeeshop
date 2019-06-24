function addDnDHandlers() {
  var coffeeimages = document.getElementsByClassName("productarticlewide");
  var shoppingCartDropzone = document.getElementById("shoppingcart");
  var shoppingcart = document.querySelectorAll("#shoppingcart ul")[0];

  var Cart = function() {
    this.coffees = new Array();
  };

  //using a constructor in javaScript
  var Coffee = function(id, price) {
    this.coffeeId = id;
    this.price = price;
  };

  //creating a variable currentCart which we contain the actual shopping cart content that is coming
  //from local storage
  var currentCart = null;

  currentCart = JSON.parse(localStorage.getItem("cart"));
  //and if currentCart doesnt exist yet am going to initailaise an empty cart with a function called createEmptyCart.
  if (!currentCart) {
    createEmptyCart();
  }

  UpdateShoppingCartUI();
  currentCart.addCoffee = function(coffee) {
    currentCart.coffees.push(coffee);

    // insert the new cart into the storage as string
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  //making sure all the images are been dragged
  for (var i = 0; i < coffeeimages.length; i++) {
    coffeeimages[i].addEventListener(
      "dragstart",
      function(ev) {
        ev.dataTransfer.effectAllowed = "copy";
        ev.dataTransfer.setData("Text", this.getAttribute("id"));
      },
      false
    );
  }

  //this will make the image been dropped effective
  shoppingCartDropzone.addEventListener(
    "dragover",
    function(ev) {
      if (ev.preventDefault) ev.preventDefault();
      ev.dataTransfer.dropEffect = "copy";
      return false;
    },
    false
  );

  shoppingCartDropzone.addEventListener(
    "drop",
    function(ev) {
      if (ev.stopPropagation) ev.stopPropagation();

      var coffeeId = ev.dataTransfer.getData("Text");
      var element = document.getElementById(coffeeId);

      addCoffeeToShoppingCart(element, coffeeId);
      ev.stopPropagation();

      return false;
    },
    false
  );

  //this function create a string HTML and the string is composed out of the Id, space, and then from the items or element i try to fetch the price
  //which is currently in the data dash price attribute.then create a new li element and set its HTML using the error Html property.
  //finally will append the li using append chart function onto the shopping cart which was actually the ul that i grabbed earlier
  function addCoffeeToShoppingCart(item, id) {
    var price = item.getAttribute("data-price");

    var coffee = new Coffee(id, price);
    currentCart.addCoffee(coffee);

    UpdateShoppingCartUI();
  }

  //put the localstorage function here at the bottom
  function createEmptyCart() {
    localStorage.clear();
    localStorage.setItem("cart", JSON.stringify(new Cart()));
    currentCart = JSON.parse(localStorage.getItem("cart"));
  }

  function UpdateShoppingCartUI() {
    shoppingcart.innerHTML = "";
    for (var i = 0; i < currentCart.coffees.length; i++) {
      var liElement = document.createElement("li");
      liElement.innerHTML =
        currentCart.coffees[i].coffeeId + " " + currentCart.coffees[i].price;
      shoppingcart.appendChild(liElement);
    }
  }
}
