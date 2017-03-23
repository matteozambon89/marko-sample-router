/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-23 10:23:36
*/

'use strict'

const appRoot = require('~/views/app/root')
const pageConfig = require('~/views/pages/root/assets/json/page-config.json')

module.exports = {
  onCreate(input) {
    console.log('[root/root-page] onCreate')

    this.state = {
      'rootState': input.rootState,
      'currentState': input.currentState
    }
  },
  onMount() {
    console.log('[root/root-page] onMount')

    this.subscribeTo(appRoot)
      .on('state.change', (args) => {
        console.log('[root/root-page] appRoot on(state.change).{args}: ')
        console.log(args)

        this.setState('currentState', args.to.state)
      })

    appRoot.config = pageConfig
    appRoot.handleOnMount(this.state.rootState, this.state.currentState)
  },
  onRender() {
    console.log('[root/root-page] onRender')
  },
  onUpdate() {
    console.log('[root/root-page] onUpdate')
  }
}
