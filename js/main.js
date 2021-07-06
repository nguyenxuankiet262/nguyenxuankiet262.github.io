(function ($, document, window) {
  var $document = $(document);
  var $window = $(window);
  var $body = $('body');
  var $nav = $('nav');

  // toggle navbar as viewer scrolls down the page
  var showNavLimit = $('.profile.card .email').position().top;
  var navShown = false;
  var scrollSpy = false;
  var documentScroll = function (e) {
    var scrollTop = $document.scrollTop();

    if (scrollTop > showNavLimit) {
      if (!navShown) {
        $body.addClass('show-nav');
        navShown = true;

        if (!scrollSpy) {
          $body.scrollspy({
            target: 'nav',
            offset: 0,
          });
          scrollSpy = true;
        }
      }
    } else {
      if (navShown) {
        $body.removeClass('show-nav');
        navShown = false;
      }
    }
  };
  $document.scroll(documentScroll);

  // track outbound link events with Google Analytics
  // https://support.google.com/analytics/answer/1136920?hl=en
  var trackOutboundLink = function (e) {
    if (typeof ga == 'undefined') {
      return;
    }

    var $link = $(e.currentTarget);
    var url = $link.attr('target') == '_blank' ? $link.attr('href') : '';

    if (url) {
      ga('send', 'event', 'outbound', 'click', url);
    }
  };
  $('a').click(trackOutboundLink);

  // tooltips
  $('.Tooltip').tooltip();
})(jQuery, document, this);

$(document).ready(function () {
  $('.progress .progress-bar').css('width', function () {
    return $(this).attr('aria-valuenow') + '%';
  });
});
