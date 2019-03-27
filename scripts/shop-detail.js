ShopDetail = function() {};

ShopDetail.prototype = {
  show: function(products) {
    jQuery('head').append(
      `<style>td, th { border: solid 1px black; } </style>`
    );
    var divContent = jQuery('.shop-search-page__right-section');
    divContent.empty();

    var turnover = this.getTurnover(products);
    divContent.append(
      `<p><h2>Tổng doanh thu: ` + this.numberWithCommas(turnover) + `</h2></p>`
    );
    divContent.append(`<p><h2>Doanh thu chi tiết</h2></p>`);
    divContent.append(`<table style="border-collapse: collapse;">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                </tr>
            </thead>
            <tbody id="extension-detail-products">
  
            </tbody>
          </talbe>`);

    for (var i = 0; i < products.length; i++) {
      jQuery('#extension-detail-products').append(
        `<tr> <td>` +
          (i + 1) +
          `</td>
        <td>` +
          products[i].name +
          `</td>
       <td>` +
          this.numberWithCommas(products[i].price) +
          `</td>
       <td>` +
          this.numberWithCommas(products[i].count) +
          `</td>
       </tr>`
      );
    }
  },
  getTurnover: function(products) {
    var turnover = 0;
    for (var i = 0; i < products.length; i++) {
      turnover += products[i].count * products[i].price;
    }
    return turnover;
  },
  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};
