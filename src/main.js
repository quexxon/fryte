'use strict'

require('./style.css')

function objectToQueryString (obj) {
  const pairs = Object.keys(obj).map(k =>
    `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`
  )

  return pairs.join('&')
}

function createYouTubeThumb (id) {
  const url = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  const playButton = require('./play-button.svg')

  return `<img class="fryte-thumb" src="${url}">${playButton}`
}

function createYouTubeIFrame (options) {
  return (e) => {
    const iframe = document.createElement('iframe')
    const player = e.target.closest('.fryte')
    const url = `https://www.youtube.com/embed/${player.dataset.id}?${objectToQueryString(options)}`

    iframe.classList.add('fryte-iframe')
    iframe.setAttribute('src', url)
    iframe.setAttribute('frameborder', '0')
    iframe.setAttribute('allowfullscreen', true)

    player.innerHTML = iframe.outerHTML
  }
}

function init (options = false) {
  const els = document.querySelectorAll('.fryte')

  options = options || {
    autoplay: 1,
    autohide: 2,
    enablejsapi: 0,
    color: 'white',
    controls: 2,
    showinfo: 0
  }

  Array.prototype.forEach.call(els, (el) => {
    const dummy = document.createElement('div')

    dummy.innerHTML = createYouTubeThumb(el.dataset.id)
    el.appendChild(dummy)
    el.outerHTML = `<div class="fryte-wrapper">${el.outerHTML}</div>`
  })

  document.querySelector('body').addEventListener('click', e => {
    const target = e.target.closest('.fryte > div')

    if (target) {
      createYouTubeIFrame(options)(e)
    }
  })
}

// Polyfill Element.prototype.closest and Element.prototype.matches
// Lightly adapted from https://github.com/jonathantneal/closest
((elt) => {
  elt.matches = elt.matches ||
    elt.mozMatchesSelector ||
    elt.msMatchesSelector ||
    elt.oMatchesSelector ||
    elt.webkitMatchesSelector

  elt.closest = elt.closest || function closest (selector) {
    let el = this

    while (el) {
      if (el.matches(selector)) {
        break
      }

      el = el.parentElement
    }

    return el
  }
})(window.Element.prototype)

window.Fryte = init
