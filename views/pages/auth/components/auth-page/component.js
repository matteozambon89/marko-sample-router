/*
* @Author: Matteo Zambon
* @Date:   2017-03-15 22:57:27
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-25 23:08:02
*/

'use strict'

const appAuth = require('~/views/app/auth')
const pageConfig = require('~/views/pages/auth/assets/json/page-config.json')

module.exports = {
  onCreate(input) {
    console.log('[auth/auth-page] onCreate')

    this.state = {
      'rootState': input.rootState
    }
  },
  onMount() {
    console.log('[auth/auth-page] onMount')

    this.subscribeTo(appAuth)
      .on('state.change', (args) => {
        console.log('[auth/auth-page] appAuth on(state.change).{args}: ')
        console.log(args)

        this.setState({
          'currentState': args.to.route.component.state || args.to.state,
          'componentKey': args.to.route.component.key,
          'componentParams': args.to.route.component.params
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

    console.log(this)

    window.authPage = this
  },
  onDestroy() {
    console.log('[auth/auth-page] onDestroy')
  }
}
