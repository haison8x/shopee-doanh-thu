DataExtractor = function() {};

DataExtractor.prototype = {
  getProducts: function() {
    var products = [];
    jQuery('div._1gkBDw').each(function(i, e) {
      var count = jQuery('._18SLBt', e).text();
      count = count.replace('đã bán', '');
      count = jQuery.trim(count);
      count = parseInt(count);
      count = count == null || count == undefined || isNaN(count) ? 0 : count;

      var name = jQuery('._1NoI8_._2gr36I', e).text();
      name = jQuery.trim(name);

      var price = jQuery('._341bF0', e)
        .first()
        .text();
      price = price.replace('.', '');
      price = jQuery.trim(price);
      price = parseFloat(price);
      price = price == null || price == undefined || isNaN(price) ? 0 : price;
      var product = { name: name, price: price, count: count };
      products.push(product);
    });

    return products;
  },
  getNextUrl: function() {
    var currentUrl = location.href;
    var current = jQuery(
      '.shopee-page-controller .shopee-button-solid--primary'
    );
    var next = current.next();
    var nextPage = next.text();

    if (nextPage === '') {
      return '';
    } else {
      var url = new URL(currentUrl);
      var queryString = url.search;
      var searchParams = new URLSearchParams(queryString);
      searchParams.set('page', parseInt(nextPage) - 1);
      url.search = searchParams.toString();

      return url.toString();
    }
  }
};
