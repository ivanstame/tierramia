var wares = document.getElementsByClassName('product');
var lineItemsToAdd = [];
var checkoutId = '';
var catalogLength = 0;
var productObjects = [];


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
               }
               m++;
           }
        }); // end of click listener
        i++;
    } // end of while loop 
}); // end of fetch request



// client.checkout.create().then((checkout) => {
//   // Do something with the checkout
//     checkoutId = checkout.id;
//   console.log(checkout);
// });