var wares = document.getElementsByClassName('product');
var productObjects = [];
var lineItemsToAdd = [];
var checkoutId = '';

console.log(wares[0]);


//Initialize Client
const client = ShopifyBuy.buildClient({
    domain: 'tierra-mia-coffee.myshopify.com',
    storefrontAccessToken: 'c45f5526ed444a515f62cd7173b7a44b'
});

client.product.fetchAll().then((products) => {
  // products is now an array
  // assign variables to each products image src - 
    var imgUrls = [];
    //loop through and push all the values to it
    var i = 0;
    while (i < products.length){
        imgUrls.push( client.image.helpers.imageForSize(products[i].variants[0].image, {maxWidth: 200, maxHeight: 200}) );
        i++;
    }
    
    console.log(imgUrls);
    //loop through the products array and assign the img srcs from the imgURLS array
    var j = 0;
    while(j<products.length){
        var url = client.image.helpers.imageForSize(products[j].variants[0].image, {maxWidth: 200, maxHeight: 200});
        $(wares[j]).children('img').attr('src', url);
        $(wares[j]).children('h3').text(products[j].title);
        productObjects.push(products[j]);
//         $(wares[j]).children('button').click(function(){
//             var variantId = products[j].id;
//             var name = products[j].title;
//             var itemAdded = {};
//             itemAdded.variantId = variantId;
//             itemAdded.quantity = 1;
//             itemAdded.title = name;
//             console.log("the most recent item selected is below this line");
//             console.log(itemAdded);
//             lineItemsToAdd.push(itemAdded);
//             console.log("the Items to be added to the Cart are below this line");
//             console.log(lineItemsToAdd);
            
//             client.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
//                  // Do something with the updated checkout
//              console.log("the contents of the cart in total is below this line");
//              console.log(checkout.lineItems); // Array with one additional line item
// });
//         });
        j++;
    }
       console.log(productObjects);
//     console.log(products);
});
  


client.checkout.create().then((checkout) => {
  // Do something with the checkout
    checkoutId = checkout.id;
  console.log(checkout);
});