/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-25 00:13:43
*/

'use strict'

const appAuth = require('~/views/app/auth')
const pageConfig = require('~/views/pages/auth/assets/json/page-config.json')

module.exports = {
  onCreate(input) {
    console.log('[auth/auth-page] onCreate')

    this.state = {
      'rootState': input.rootState,
      'currentState': input.currentState,
      'currentComponent': null
    }
  },
  onMount() {
    console.log('[auth/auth-page] onMount')

    this.subscribeTo(appAuth)
      .on('state.change', (args) => {
        console.log('[auth/auth-page] appAuth on(state.change).{args}: ')
        console.log(args)

        this.setState('currentState', args.to.state)

        const el = this.getEl('auth-app')

        setTimeout(() => {
          const view = require('../' + this.state.rootState + '-route-' + this.state.currentState + '/index.marko')

          view.render({}, (err, result) => {
            if(err) {
              console.error(err)

              return
            }

            result.appendTo(el)
          })
        })
      })

    appAuth.config = pageConfig
    appAuth.handleOnMount(this.state.rootState, this.state.currentState)
  },
  onRender(out) {
    console.log('[auth/auth-page] onRender')
  },
  onUpdate() {
    console.log('[auth/auth-page] onUpdate')
  },
  onDestroy() {
    console.log('[auth/auth-page] onDestroy')
  }
}
