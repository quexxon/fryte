'use strict';

require('./style.css');

const createYouTubeThumb = id => {
  let url = `//i.ytimg.com/vi/${id}/hqdefault.jpg`,
      playButton = '<svg class="fryte-play-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" height="60" width="60"><circle r="30" cy="30" cx="30" opacity=".75"/><circle r="26" cy="30" cx="30" fill="none" stroke="#fff" stroke-width="2"/><path fill="#fff" d="M24 20l18 10-18 10z"/></svg>';
  
  return `<img class="fryte-thumb" src="${url}">${playButton}`;
};


const createYouTubeIFrame = e => {
  let iframe = $('<iframe>'),
      player = $(e.target).closest('.fryte'),
      options = {
        autoplay: 1,
        autohide: 2,
        enablejsapi: 0,
        color: 'white',
        controls: 2,
        showinfo: 0,
      },
      url = `//www.youtube.com/embed/${player.data('id')}?${$.param(options)}`;

  iframe.addClass('fryte-iframe');
  iframe.attr('src', url);
  iframe.attr('frameborder', "0");
  iframe.attr('allowfullscreen', true);
  
  player.children().replaceWith(iframe);
};


const init = () => {
  let els = $('.fryte');
  
  els.wrap($('<div class="fryte-wrapper" />'));
  els.each(function () {
    let dummy = $('<div>');

    dummy.html(createYouTubeThumb($(this).data('id')));

    $(this).append(dummy);
  });

  $('body').on('click', '.fryte > div', createYouTubeIFrame);
};

$(document).ready(init);
