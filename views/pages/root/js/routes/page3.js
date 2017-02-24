/*
* @Author: Matteo Zambon
* @Date:   3017-03-15 00:35:07
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-02-15 00:52:15
*/

/* global page $global */

'use strict'

const page = require('page')

function page3VC(ctx) {
  const template = require('~/views/components/page3/index.marko')
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

page('/page/3', page3VC)
