/*
* @Author: Matteo Zambon
* @Date:   2017-03-18 17:26:56
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-22 17:34:48
*/

'use strict'

const EventEmitter = require('events')
const page = require('page')
const objectPath = require('object-path')

class AppPage extends EventEmitter {
  constructor() {
    super()

    console.log('[Page] constructor')

    this._pageInstance = page

    this._config = null

    this._stateRoot = null

    this._state = null
    this._ctx = {}
  }
  /**
   * Set config
   * @created 2017-03-21T22:32:05-0300
   * @param   {object}                 newConfig Configuration object
   * @return  {null}                             no-return
   */
  set config(newConfig) {
    console.log('[Page] set config.{newConfig}:')
    console.log(newConfig)

    this._config = newConfig
  }
  /**
   * Get config
   * @created 2017-03-21T22:32:50-0300
   * @return  {object}                 Configuration object
   */
  get config() {
    return this._config
  }
  /**
   * Get Config property
   * @private
   * @created 2017-03-21T18:21:24-0300
   * @param   {string}                 keyPath   Key Path for Page Config except State Root
   * @param   {string}                 stateRoot Override current State Root
   * @return  {any}                              Property related to State Root and Key Path
   */
  _getConfig(keyPath, stateRoot) {
    console.log('[Page] _getConfig.{keyPath}: ' + keyPath)
    console.log('[Page] _getConfig.{stateRoot}: ' + stateRoot)

    // Define whether use current State Root or override it
    stateRoot = stateRoot || this._stateRoot
    // Update Key Path including or isolating State Root
    keyPath = keyPath ? [stateRoot, keyPath].join('.') : stateRoot

    console.log('[Page] _getConfig.{keyPath}:' + keyPath)

    // Return value in Key Path of Config
    const property = objectPath.get(this._config, keyPath)

    console.log('[Page] _getConfig.{property}:' + JSON.stringify(property))

    return property
  }
  /**
   * Extract State Root from State
   * @private
   * @created 2017-03-21T18:24:38-0300
   * @param   {string}                 state State (e.g. 'root.myState' or 'root')
   * @return  {string}                       State Root (e.g. 'root' or null)
   */
  _getStateRootFromState(state) {
    console.log('[Page] _getStateRootFromState.{state}: ' + state)

    const stateRootMatches = this._state.match(/^[^\.]+/)

    console.log('[Page] _getStateRootFromState.{stateRootMatches}: ' + stateRootMatches)

    if(!stateRootMatches) {
      return null
    }

    return stateRootMatches[0]
  }
  /**
   * Get path from state, params and stateRoot
   * @private
   * @created 2017-03-22T17:01:39-0300
   * @param   {string}                 state     State
   * @param   {object}                 params    State parameters
   * @param   {string}                 stateRoot State root
   * @return  {string}                           Url path computed
   */
  _getPathUrl(state, params, stateRoot) {
    console.log('[Page] _getPathUrl.{state}: ' + state)
    console.log('[Page] _getPathUrl.{params}: ' + JSON.stringify(params))
    console.log('[Page] _getPathUrl.{stateRoot}: ' + stateRoot)

    // Get Path of State
    let url = this._getConfig(state + '.path', stateRoot)

    if(typeof params === 'object') {
      for(const p in params) {
        url = url.replace(':' + p, params[p])
      }
    }

    if(stateRoot && stateRoot !== this._stateRoot) {
      const base = this._getConfig('_base', stateRoot)

      url = base + url
    }

    console.log('[Page] _getPathUrl.{url}: ' + url)

    return url
  }
  /**
   * Define State Root from current State
   * @private
   * @created 2017-03-21T18:25:44-0300
   * @return  {string}                 State Root
   */
  _defStateRoot() {
    console.log('[Page] _defStateRoot.{this._state}: ' + this._state)

    this._stateRoot = this._getStateRootFromState(this._state)

    console.log('[Page] _defStateRoot.{this._state}: ' + this._stateRoot)
  }
  /**
   * Define Page Base based on '_base' key in State Root Config
   * @private
   * @created 2017-03-21T18:26:26-0300
   * @return  {none}                 no-return
   */
  _defPageBase() {
    // {this.stateRoot}._base
    const base = this._getConfig('_base')

    console.log('[Page] _defPageBase.{base}: ' + base)

    // Set Page Base
    page.base(base)
  }
  /**
   * Define Page Default (redirect / to correct state)
   * @private
   * @created 2017-03-21T18:27:58-0300
   * @return  {none}                 no-return
   */
  _defPageDefault() {
    // {this._stateRoot}._default
    this._stateDefault = this._getConfig('_default')

    // {this._stateRoot}.{this._stateDefault}.path
    const stateDefaultPath = this._getConfig(this._stateDefault + '.path')

    console.log('[Page] _defPageDefault.{stateDefaultPath}: ' + stateDefaultPath)

    // redirect / to {this._stateRoot}.{this._stateDefault}.path
    page('/', stateDefaultPath)
  }
  /**
   * Define Page Routes
   * @private
   * @created 2017-03-21T18:40:15-0300
   * @return  {none}                 no-return
   */
  _defPageRoutes() {
    // {this._stateRoot}
    const stateRootConfig = this._getConfig()

    console.log('[Page] _defPageRoutes.{stateRootConfig}: ')
    console.log(stateRootConfig)

    // For each public property of State Root Config
    for(const r in stateRootConfig) {
      // Get property as route
      const route = stateRootConfig[r]

      // Ensure isn't public
      if(r.match(/^_/)) {
        console.log('[Page] _defPageRoutes.{r}: ' + r + ' IGNORE')

        continue
      }

      // If {route} is string means it's a redirect
      if(typeof route === 'string') {
        // Setup page redirect from {r} to {route} ({r} and {route} must be paths of the same State Root)
        page(r, route)

        continue
      }

      // Define Page with {r} as state and {route}
      this._defPageRoute(r, route)
    }
  }
  /**
   * Define Page Route
   * @private
   * @created 2017-03-21T18:43:05-0300
   * @param   {string}                 state State
   * @param   {object}                 route Route
   * @return  {none}                         no-return
   */
  _defPageRoute(state, route) {
    console.log('[Page] _defPageRoute.{state}: ' + state)
    console.log('[Page] _defPageRoute.{route.path}: ' + route.path)

    // Set a Page Route and use a function as handler
    page(route.path, (ctx) => {
      console.log('[Page] onMatch.{state}: ' + state)
      console.log('[Page] onMatch.{route.path}: ' + route.path)
      console.log('[Page] onMatch.{ctx}: ')
      console.log(ctx)

      // Set current state {this._state}
      const from = this._state
      // Set next state {this._stateRoute}.{state}
      const to = this._stateRoot + '.' + state

      // Set state as {to}
      this._state = to
      // Set ctx as {ctx}
      this._ctx = ctx

      // Emit event state.change
      this._emitChangeState({
        'from': from,
        'to': to,
        'ctx': ctx
      })
    })
  }
  /**
   * Emit State has been changed
   * @private
   * @created 2017-03-21T18:50:31-0300
   * @param   {object}                 args Arguments to pass during event
   * @return  {none}                        no-return
   */
  _emitChangeState(args) {
    console.log('[Page] _emitChangeState.{args}: ')
    console.log(args)

    this.emit('state.change', args)
  }
  /**
   * Emit Page has been Initialized
   * @private
   * @created 2017-03-21T18:50:31-0300
   * @param   {object}                 args Arguments to pass during event
   * @return  {none}                        no-return
   */
  _emitPageInit(args) {
    console.log('[Page] _emitPageInit.{args}: ')
    console.log(args)

    this.emit('page.init', args)
  }

  /**
   * Set current state
   * @created 2017-03-21T18:57:27-0300
   * @param   {string}                 newState State to be set
   * @return  {none}                            no-return
   */
  set state(newState) {
    console.log('[Page] set state.{this._state}: ' + this._state)
    console.log('[Page] set state.{newState}: ' + newState)

    this._state = newState
  }
  /**
   * Get current state
   * @created 2017-03-21T18:58:32-0300
   * @return  {string}                 Current state
   */
  get state() {
    return this._state
  }
  /**
   * Get current context
   * @created 2017-03-21T18:59:57-0300
   * @return  {object}                 Current context
   */
  get ctx() {
    return this._ctx
  }

  /**
   * Handle onMount from Marko Component
   * @created 2017-03-21T19:00:34-0300
   * @param   {string}                 state Current Root State
   * @return  {none}                         no-return
   */
  handleOnMount(state) {
    console.log('[Page] handleOnMount.{state}: ' + state)

    // Set current state
    this._state = state
    // Initialize Page
    this._initPage()
  }
  /**
   * Go To State
   * @created 2017-03-21T19:07:27-0300
   * @param   {string}                 state     New state
   * @param   {object}                 params    State parameters
   * @param   {string}                 stateRoot New state root
   * @return  {none}                          no-return
   */
  goTo(state, params, stateRoot) {
    console.log('[Page] goTo.{state}: ' + state)
    console.log('[Page] goTo.{params}: ' + JSON.stringify(params))
    console.log('[Page] goTo.{stateRoot}: ' + stateRoot)

    if(stateRoot && stateRoot !== this._stateRoot) {
      // Set Page Base to new State Root

      const url = this._getPathUrl(state, params, stateRoot)

      console.log('[Page] goTo.{stateRoot}: ' + stateRoot)

      this.goToExternalUrl(url)

      return
    }

    const url = this._getPathUrl(state, params, this._stateRoot)

    // Redirect to Path
    this.goToInternalUrl(url)
  }
  goToInternalUrl(url) {
    page(url)
  }
  goToExternalUrl(url) {
    location.href = url
  }
  /**
   * Initialize Page
   * @created 2017-03-21T19:11:02-0300
   * @return  {none}                 no-return
   */
  _initPage() {
    console.log('[Page] _initPage.{this}: ')
    console.log(this)

    // Define State Root
    this._defStateRoot()
    // Define Page Base
    this._defPageBase()
    // Define Page Default
    this._defPageDefault()
    // Define Page Routes
    this._defPageRoutes()

    // Start Page
    page()

    // Emit Page has been Initialized
    this._emitPageInit()
  }
}

module.exports = AppPage
