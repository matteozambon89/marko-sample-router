/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-25 22:13:40
*/

'use strict'

const appRoot = require('~/views/app/root')
const pageConfig = require('~/views/pages/root/assets/json/page-config.json')

module.exports = {
  onCreate(input) {
    console.log('[root/root-page] onCreate')

    this.state = {
      'rootState': input.rootState
    }
  },
  onMount() {
    console.log('[root/root-page] onMount')

    this.subscribeTo(appRoot)
      .on('state.change', (args) => {
        console.log('[root/root-page] appRoot on(state.change).{args}: ')
        console.log(args)

        this.setState('currentState', args.to.route.component.state || args.to.state)
        this.setState('componentKey', args.to.route.component.key)
        this.setState('componentParams', args.to.route.component.params)
      })

    appRoot.config = pageConfig
    appRoot.handleOnMount(this.state.rootState, this.state.currentState)
  },
  onRender(out) {
    console.log('[root/root-page] onRender')
  },
  onUpdate() {
    console.log('[root/root-page] onUpdate')
  },
  onDestroy() {
    console.log('[root/root-page] onDestroy')
  }
}
