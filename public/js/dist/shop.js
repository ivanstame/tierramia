var wares = document.getElementsByClassName('product');
var lineItemsToAdd = [];
// it doesn't seem that the stored variable "cart" points to the same object as the one created by the createcheckout operation
var checkoutId;
var catalogLength = 0;
var productObjects = [];
var cartTotal = document.getElementById('total');
var cart = document.getElementById('cart');


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
                   console.log(productObjects[m].id);
                   var lineItemsToAdd = [{
                       variantId: products[m].variants[0].id,
                       quantity: 1,
                       customAttributes: [{key: "title", value: products[m].title}],
                   }];
                   console.log(lineItemsToAdd);
                   client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
                    cartTotal.innerText = "Total: " + checkout.totalPrice;
                       console.log(checkout);
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

