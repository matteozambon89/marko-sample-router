/*
* @Author: Matteo Zambon
* @Date:   2017-02-15 00:25:07
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-02-15 00:52:04
*/

/* global page $global */

'use strict'

const page = require('page')

function page1VC(ctx) {
  const template = require('~/views/components/page1/index.marko')
  const element = $global.main

  template.render({})
    .then((result) => {
      element.innerHTML = ''
      result.appendTo(element)
    })
    .catch((err) => {
      console.log('template - error')
      console.error(err)
    })
}

page('/', '/page/1')
page('/page/1', page1VC)
