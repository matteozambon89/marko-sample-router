/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-19 23:16:01
*/

'use strict'

const appPage = require('~/views/app/page')
const pageConfig = require('./page-config.json')

module.exports = {
  onCreate(input) {
    console.log('root/components/root-app - onCreate')
    console.log(this)
    console.log(input)

    this.state = {
      'currentPath': null
    }

    console.log(this.state)
    console.log('- - -')
  },
  onMount() {
    console.log('root/components/root-app - onMount')
    console.log(this)
    console.log(this.el)
    console.log('- - -')

    pageConfig.rootComponent = this

    this.subscribeTo(appPage)
      .on('change', (newState) => {
        console.log('subscribeTo!')
        console.log(newState)

        this.state.currentPath = newState.to
      })

    appPage.onMount(pageConfig)
  },
  onRender() {
    console.log('root/components/root-app - onRender')
  },
  onUpdate() {
    console.log('root/components/root-app - onUpdate')

    appPage.onUpdate(this)
  },
  routePage1(ctx) {
    console.log('root/components/root-app - routePage1')
    console.log(ctx)
    console.log(this)
    console.log(this.el)
    console.log(this.getEl('root-route-page1'))
    console.log(this.getComponent('root-route-page1'))
    console.log('- - -')
  },
  routePage2(ctx) {
    console.log('root/components/root-app - routePage2')
    console.log(ctx)
    console.log(this)
    console.log(this.el)
    console.log(this.getEl('root-route-page2'))
    console.log(this.getComponent('root-route-page2'))
    console.log('- - -')
  },
  routePage3(ctx) {
    console.log('root/components/root-app - routePage3')
    console.log(ctx)
    console.log(this)
    console.log(this.el)
    console.log(this.getEl('root-route-page3'))
    console.log(this.getComponent('root-route-page3'))
    console.log('- - -')
  },
  routePage4(ctx) {
    console.log('root/components/root-app - routePage4')
    console.log(ctx)
    console.log(this)
    console.log(this.el)
    console.log(this.getEl('root-route-page4'))
    console.log(this.getComponent('root-route-page4'))
    console.log('- - -')
  }
}
