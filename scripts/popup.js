// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
var products = [];
var browser = new PopupBrowser();
$(document).ready(function() {
  $('#calculate').on('click', function() {
    reset();
    products = [];
    chrome.tabs.getSelected(null, function(tab) {
      var tabUrl = tab.url;
      var firstPageUrl = getFirstPageUrl(tabUrl);
      browser.fetchData(firstPageUrl, fetchDataCallback);
    });

    function fetchDataCallback(result) {
      products = products.concat(result.products);
      if (result.nextUrl !== '') {
        browser.fetchData(result.nextUrl, fetchDataCallback);
      } else {
        $('#status').empty();
        browser.showDetail(products);
      }
    }
  });

  function getFirstPageUrl(urlString) {
    var url = new URL(urlString);
    url.search = 'sortBy=pop';
    return url.toString();
  }

  function reset() {
    $('#status')
      .empty()
      .append('<span> Đang tính toán, vui lòng chờ</span>');
  }
});
