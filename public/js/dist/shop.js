var wares = document.getElementsByClassName('product');
var lineItemsToAdd = [];
// it doesn't seem that the stored variable "cart" points to the same object as the one created by the createcheckout operation
var checkoutId;
var catalogLength = 0;
var productObjects = [];
var cartTotal = document.getElementById('total');
var cartTable = document.getElementById('cart-table');


//Initialize Client
const client = ShopifyBuy.buildClient({
    domain: 'tierra-mia-coffee.myshopify.com',
    storefrontAccessToken: 'c45f5526ed444a515f62cd7173b7a44b'
});




client.product.fetchAll().then((products) => {
    catalogLength = products.length;
    var imgUrls = [];
    var i = 0;
    var url = client.image.helpers.imageForSize(products[i].variants[0].image, {maxWidth: 200, maxHeight: 200});
    while (i < products.length){
        imgUrls.push( client.image.helpers.imageForSize(products[i].variants[0].image, {maxWidth: 300, maxHeight: 300}) );
        productObjects.push(products[i]);
        //assign images and titles
        $(wares[i]).children('img').attr('src', url);
        $(wares[i]).children('h3').text(products[i].title);
        $(wares[i]).children('button').attr('data-hook', products[i].title);
        //assign event listeners to pull up corresponding productObject
       $(wares[i]).children('button').click(function(){
           var name = event.currentTarget.dataset.hook;
           console.log(name);
           var m = 0;
           while(m<catalogLength){
               if (productObjects[m].title == name){
                   console.log(productObjects[m]);
                   var lineItemsToAdd = [{
                       variantId: products[m].variants[0].id,
                       quantity: 1,
                       customAttributes: [{key: "title", value: products[m].title}],
                   }];

                   if(!$.contains(cartTable, document.getElementById(productObjects[m].title))){
                      var newRow = cartTable.insertRow(1);
                      var adjustBtns = $('<div class="adjust-btn-container">' + '<button class="plus adjust-btn">+</button>' + '<button class="minus adjust-btn">-</button>' + '</div>');
                      newRow.id = productObjects[m].title;
                      var cell0 = newRow.insertCell(0);
                      var cell1 = newRow.insertCell(1);
                      var cell2 = newRow.insertCell(2);
                      var cell3 = newRow.insertCell(3);
                      var cell4 = newRow.insertCell(4);
                      var thumbnail = $('<img class="thumbnail">');
                      thumbnail.attr('src', url);
                      thumbnail.appendTo(cell0);
                      cell1.innerText = productObjects[m].title;
                      cell2.innerText = productObjects[m].variants[0].price;
                      cell3.innerText = 1;
                      adjustBtns.appendTo(cell4);
                   } else {
                       var newNum = document.getElementById(productObjects[m].title).children[3].innerText;
                       document.getElementById(productObjects[m].title).children[3].innerText = parseInt(newNum) + 1;
                   }

//                    console.log(lineItemsToAdd);
                   client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
                      cartTotal.innerText = "Total: " + checkout.totalPrice;
                       console.log(checkout.lineItems);
                    });
               }
               m++;
           }
        }); // end of click listener
        i++;
    } // end of while loop
}); // end of fetch request

//create the cart
client.checkout.create().then((checkout) => {
    checkoutId = checkout.id;
    console.log(checkout);
});

$('#cart-show-hide').click(function(){
  // event.currentTarget.parentElement.style.transform = "translate(0%, -50%)";
  event.currentTarget.parentElement.classList.toggle('menu-visible');
});


$('#cart-table').on('click', '.adjust-btn', function(){
    console.log($(this));
    let hook = ($(this).parent().parent().parent()[0].id);
    let targetQty = $(this).parent().parent().parent()[0].children[3].innerText;
    for(let x=0; x < productObjects.length; x++){
      if(productObjects[x].title === hook){
        //perform your fetch to update the cart quantity for the  specific item
        if($(this).hasClass('minus') && targetQty != 0) {
          let minusQty = parseInt(targetQty) - 1;
          $(this).parent().parent().parent()[0].children[3].innerText = minusQty;
        } else if ($(this).hasClass('plus')){
          let plusQty = parseInt(targetQty) + 1;
          $(this).parent().parent().parent()[0].children[3].innerText = plusQty;
        }

      }
    }
});
