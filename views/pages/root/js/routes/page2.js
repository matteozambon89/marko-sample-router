/*
* @Author: Matteo Zambon
* @Date:   2017-02-15 00:25:07
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-02-15 00:52:07
*/

/* global page $global */

'use strict'

const page = require('page')

function page2VC(ctx) {
  const template = require('~/views/components/page2/index.marko')
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

page('/page/2', page2VC)
