/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-15 23:21:09
*/

'use strict'

module.exports = {
  onCreate(input) {
    console.log('root/components/root-app - onCreate')
    console.log(input)

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    const self = this
    const el = this.el

    console.log('root/components/root-app - onMount')
    console.log(el)
    console.log('- - -')

    const page = require('page')

    page.base('/root')

    page('/', '/page1')
    page('/page1', (ctx) => {
      self.routePage1(ctx, el, self)
    })
    page('/page2', (ctx) => {
      self.routePage2(ctx, el, self)
    })
    page('/page3', (ctx) => {
      self.routePage3(ctx, el, self)
    })

    page()
  },
  routePage1(ctx, el, self) {
    console.log('root/components/root-app - routePage1')
    console.log(ctx)
    console.log(el)
    console.log('- - -')

    const template = require('../root-route-page1/index.marko')

    template.render({})
      .then((result) => {
        el.innerHTML = ''
        result.appendTo(el)
      })
      .catch((err) => {
        console.log('template - error')
        console.error(err)
      })
  },
  routePage2(ctx, el, self) {
    console.log('root/components/root-app - routePage2')
    console.log(ctx)
    console.log(el)
    console.log('- - -')

    const template = require('../root-route-page2/index.marko')

    template.render({})
      .then((result) => {
        el.innerHTML = ''
        result.appendTo(el)
      })
      .catch((err) => {
        console.log('template - error')
        console.error(err)
      })
  },
  routePage3(ctx, el, self) {
    console.log('root/components/root-app - routePage3')
    console.log(ctx)
    console.log(el)
    console.log('- - -')

    const template = require('../root-route-page3/index.marko')

    template.render({})
      .then((result) => {
        el.innerHTML = ''
        result.appendTo(el)
      })
      .catch((err) => {
        console.log('template - error')
        console.error(err)
      })
  }
}
