/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-22 00:21:48
*/

'use strict'

const appRoot = require('~/views/app/root')
const pageConfig = require('~/views/pages/root/assets/json/page-config.json')

module.exports = {
  onCreate(input) {
    console.log('[root-app] onCreate')

    this.state = {
      'rootState': 'root',
      'currentState': null
    }
  },
  onMount() {
    console.log('[root-app] onMount')

    this.subscribeTo(appRoot)
      .on('state.change', (args) => {
        console.log('[root-app] on(state.change).{args}: ')
        console.log(args)

        this.setState('currentState', args.to)
      })

    appRoot.config = pageConfig
    appRoot.handleOnMount(this.state.rootState)
  },
  onRender() {
    console.log('[root-app] onRender')
  },
  onUpdate() {
    console.log('[root-app] onUpdate')
  }
}
