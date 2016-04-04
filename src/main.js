'use strict';

require('./style.css');


const objectToQueryString = (obj) => {
  let pairs = Object.keys(obj).map(k => {
    return `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`;
  });

  return pairs.join("&");
};


const createYouTubeThumb = (id) => {
  let url = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      playButton = require('./play-button.svg');
  
  return `<img class="fryte-thumb" src="${url}">${playButton}`;
};


const createYouTubeIFrame = (e) => {
  let iframe = document.createElement('iframe'),
      player = e.target.closest('.fryte'),
      options = {
        autoplay: 1,
        autohide: 2,
        enablejsapi: 0,
        color: 'white',
        controls: 2,
        showinfo: 0,
      },
      url = `https://www.youtube.com/embed/${player.dataset.id}?${objectToQueryString(options)}`;

  iframe.classList.add('fryte-iframe');
  iframe.setAttribute('src', url);
  iframe.setAttribute('frameborder', "0");
  iframe.setAttribute('allowfullscreen', true);
  
  player.innerHTML = iframe.outerHTML;
};


const init = () => {
  let els = document.querySelectorAll('.fryte');
  
  Array.prototype.forEach.call(els, (el) => {
    let dummy = document.createElement('div');

    dummy.innerHTML = createYouTubeThumb(el.dataset.id);
    el.appendChild(dummy);
    el.outerHTML = `<div class="fryte-wrapper">${el.outerHTML}</div>`;
  });

  document.querySelector('body').addEventListener('click', e => {
    let target = e.target.closest('.fryte > div');
    
    if (target) {
      createYouTubeIFrame(e);
    }
  });
};


// Polyfill Element.prototype.closest and Element.prototype.matches
// Lightly adapted from https://github.com/jonathantneal/closest
(ELEMENT => {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;

  ELEMENT.closest = ELEMENT.closest || function closest (selector) {
    let el = this;

    while (el) {
      if (el.matches(selector)) {
	break;
      }

      el = el.parentElement;
    }

    return el;
  };
})(Element.prototype);


// Get things started once DOM is ready
(fn => {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})(init)
