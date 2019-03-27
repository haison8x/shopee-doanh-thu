chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.extractData) {
    var extractor = new DataExtractor(request);
    var products = extractor.getProducts();
    var nextUrl = extractor.getNextUrl();
    console.log('dataextractor data', products);
    sendResponse({
      products: products,
      nextUrl: nextUrl
    });
    return true;
  }

  if (request.showDetail) {
    var products = request.products;
    var shopDetail = new ShopDetail();
    shopDetail.show(products);
    sendResponse("OK");
    return true;
  }
});

