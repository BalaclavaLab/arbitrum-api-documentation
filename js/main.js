/**
 * language tabs module: collapses multiple code samples into tabs.
 */
;(function($) {

  function listLanguages($el, $insert) {
    $el.each(function(i) {
      var title = $(this).attr('title');
      if (title) {
        $insert.append('<li><a href="#">' + title + '</a></li>');
      }
    });
  }

  function initLanguages() {
    $('section > div.highlighter-rouge:first-of-type').each(function(i) {

      var $this = $(this).before('<ul class="languages"></ul>'),
          $languages = $this.prev(),
          $notFirst = $this.nextUntil(':not(div.highlighter-rouge)'),
          $all = $this.add($notFirst);

      $all.add($languages).wrapAll('<div class="code-viewer"></div>');

      listLanguages($all, $languages);

      $this.css('display', 'block');
      $notFirst.css('display', 'none');

      $languages.find('a').first().addClass('active');

      $languages.find('a').click(function() {
        $all.css('display', 'none');
        $all.eq($(this).parent().index()).css('display', 'block');

        $languages.find('a').removeClass('active');
        $(this).addClass('active');
        return false;
      });

      if ($languages.children().length === 0) {
        $languages.remove();
      }
    });
  }

  initLanguages();

})(jQuery);

/**
 * sidebar link module: highlights links that correspond to scrolling position.
 */
;(function($) {

  function isInlineHref(href) {
    return href !== undefined && href.indexOf('/#') === 0 && href.length > 2;
  }

  function getClosestHeader() {
    // quick solution for current use case;
    // if the sidebar contained cross-page links, then we'd have to modify
    // this logic to always look up link IDs on the current page.
    if (document.location.pathname !== '/') {
      return null;
    }

    var $links = $('.sidebar a'),
        top = window.scrollY,
        $last = $links.first();

    if (top < 300) {
      return $last;
    }

    if (top + window.innerHeight >= $('.main').height()) {
      return $links.last();
    }

    for (var i = 0; i < $links.length; i++) {
      var $link = $links.eq(i),
          href = $link.attr('href');

      if (isInlineHref(href)) {
        var $anchor = $('a[id="'+href.slice(2)+'"]');

        if ($anchor.length === 1) {
          var offset = $anchor.offset();

          if (top < offset.top - 300) {
            return $last;
          }

          $last = $link;
        }
      }
    }
    return $last;
  }

  function setActiveSidebarLink() {
      $('.sidebar a').removeClass('active');
      var $closest = getClosestHeader();
      if ($closest) {
        $closest.addClass('active');
        document.title = $closest.text() + ' - ' + _initialTitle;
      }
  }

  function initSidebarLinks() {
    var href = $('.sidebar a').first().attr('href');

    if (isInlineHref(href)) {
      setActiveSidebarLink();

      $(window).on('scroll', function(evt) {
        setActiveSidebarLink();
      });
    }
  }

  var _initialTitle = document.title;
  initSidebarLinks();

})(jQuery);
