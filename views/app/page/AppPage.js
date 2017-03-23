/*
* @Author: Matteo Zambon
* @Date:   2017-03-18 17:26:56
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-23 10:35:15
*/

'use strict'

const EventEmitter = require('events')
const page = require('page')
const objectPath = require('object-path')
const UrlAssembler = require('url-assembler')

class AppPage extends EventEmitter {
  constructor() {
    super()

    console.log('[Page] constructor')

    this._pageInstance = page

    this._config = null

    this._stateRoot = null
    this._state = null
    this._route = null
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
   * Get state root base property for specified stateRoot
   * @private
   * @created 2017-03-22T17:01:39-0300
   * @param   {string}                 stateRoot State root
   * @return  {string}                           State root base
   */
  _getStateRootBase(stateRoot) {
    stateRoot = stateRoot || this._stateRoot

    console.log('[Page] _getStatePath.{stateRoot}: ' + stateRoot)

    // Get State Root Base
    const stateRootBase = this._getConfig('_base', stateRoot)

    console.log('[Page] _getStateRootBase.{stateRootBase}: ' + stateRootBase)

    if(!stateRootBase) {
      throw new Error('Cannot find State Root Base of State Root (' + stateRoot + ')')
    }

    return stateRootBase
  }
  /**
   * Get state root default state property for specified stateRoot
   * @private
   * @created 2017-03-22T17:01:39-0300
   * @param   {string}                 stateRoot State root
   * @return  {string}                           State root Default state
   */
  _getStateRootDefaultState(stateRoot) {
    stateRoot = stateRoot || this._stateRoot

    console.log('[Page] _getStatePath.{stateRoot}: ' + stateRoot)

    // Get State Root DefaultState
    const stateRootDefaultState = this._getConfig('_default', stateRoot)

    console.log('[Page] _getStateRootDefaultState.{stateRootDefaultState}: ' + stateRootDefaultState)

    if(!stateRootDefaultState) {
      throw new Error('Cannot find State Root Default State of State Root (' + stateRoot + ')')
    }

    return stateRootDefaultState
  }
  /**
   * Get state root routes for specified stateRoot
   * @private
   * @created 2017-03-22T17:01:39-0300
   * @param   {string}                 stateRoot State root
   * @return  {object}                           State root routes
   */
  _getStateRootRoutes(stateRoot) {
    stateRoot = stateRoot || this._stateRoot

    console.log('[Page] _getStatePath.{stateRoot}: ' + stateRoot)

    const stateRootConfig = this._getConfig(undefined, stateRoot)

    const routes = {}
    for(const r in stateRootConfig) {
      const route = stateRootConfig[r]

      if(r.match(/^_/)) {
        console.log('[Page] _getStateRootRoutes.{r}: ' + r + ' < SKIPPED >')

        continue
      }

      routes[r] = route

      console.log('[Page] _getStateRootRoutes.{r}: ' + r)
    }

    return routes
  }
  /**
   * Get state property for specified stateRoot
   * @private
   * @created 2017-03-22T17:01:39-0300
   * @param   {string}                 state     State
   * @param   {string}                 stateRoot State root
   * @return  {object}                           State
   */
  _getStateRoute(state, stateRoot) {
    stateRoot = stateRoot || this._stateRoot

    console.log('[Page] _getStatePath.{state}: ' + state)
    console.log('[Page] _getStatePath.{stateRoot}: ' + stateRoot)

    // Get State Route
    const stateRoute = this._getConfig(state, stateRoot)

    console.log('[Page] _getStateRoute.{stateRoute}: ' + stateRoute)

    if(!stateRoute) {
      throw new Error('Cannot find State (' + state + ') on State Root (' + stateRoot + ')')
    }

    return stateRoute
  }
  /**
   * Get state path property for specified stateRoot
   * @private
   * @created 2017-03-22T17:01:39-0300
   * @param   {string}                 state     State
   * @param   {string}                 stateRoot State root
   * @return  {string}                           State path
   */
  _getStatePath(state, stateRoot) {
    stateRoot = stateRoot || this._stateRoot

    console.log('[Page] _getStatePath.{state}: ' + state)
    console.log('[Page] _getStatePath.{stateRoot}: ' + stateRoot)

    // Get Path of State
    const statePath = this._getConfig(state + '.path', stateRoot)

    console.log('[Page] _getStatePath.{statePath}: ' + statePath)

    if(!statePath) {
      throw new Error('Cannot find State (' + state + ') Path on State Root (' + stateRoot + ')')
    }

    return statePath
  }
  /**
   * Get path from state, params and stateRoot
   * @private
   * @created 2017-03-22T17:01:39-0300
   * @param   {string}                 state     State
   * @param   {object}                 params    Url parameters
   * @param   {string}                 stateRoot State root
   * @param   {object}                 queries   Query string parameters
   * @return  {string}                           Url path computed
   */
  _getStatePathUrl(state, params, stateRoot, queries) {
    stateRoot = stateRoot || this._stateRoot

    console.log('[Page] _getStatePathUrl.{state}: ' + state)
    console.log('[Page] _getStatePathUrl.{params}: ' + JSON.stringify(params))
    console.log('[Page] _getStatePathUrl.{stateRoot}: ' + stateRoot)
    console.log('[Page] _getStatePathUrl.{queries}: ' + JSON.stringify(queries))

    // Get Path of State
    const url = this._getStatePath(state, stateRoot)

    // Initialize UrlAssembler instance
    let urlAssembler = UrlAssembler()

    // Check if prefix is needed
    if(stateRoot !== this._stateRoot) {
      const base = this._getStateRootBase(stateRoot)

      urlAssembler = urlAssembler.prefix(base)
    }

    // Add template
    urlAssembler = urlAssembler.template(url)

    // Compute params
    if(params) {
      urlAssembler = urlAssembler.param(params)
    }
    // Compute query strings
    if(queries) {
      urlAssembler = urlAssembler.query(queries)
    }

    // Get assembled url
    const urlAssembled = urlAssembler.toString()

    console.log('[Page] _getStatePathUrl.{urlAssembled}: ' + urlAssembled)

    return urlAssembled
  }

  /**
   * Define Page Base based on '_base' key in State Root Config
   * @private
   * @created 2017-03-21T18:26:26-0300
   * @return  {none}                 no-return
   */
  _defPageBase() {
    // {this.stateRoot}._base
    const base = this._getStateRootBase()

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
    const stateDefault = this._getStateRootDefaultState()

    // {this._stateRoot}.{stateDefault}.path
    const stateDefaultPath = this._getStatePath(stateDefault)

    // redirect / to {this._stateRoot}.{stateDefault}.path
    page('/', stateDefaultPath)
  }
  /**
   * Define Page Routes
   * @private
   * @created 2017-03-21T18:40:15-0300
   * @return  {none}                 no-return
   */
  _defPageRoutes() {
    const stateRootRoutes = this._getStateRootRoutes()

    // For each public property of State Root Config
    for(const routeState in stateRootRoutes) {
      // Get property as route
      const route = stateRootRoutes[routeState]

      console.log('[Page] _defPageRoutes.{routeState}: ' + routeState)

      // If {route} is string means it's a redirect
      if(typeof route === 'string') {
        console.log('[Page] _defPageRoutes.{route}: ' + route + ' < IS REDIRECT >')

        // Setup page redirect from {r} to {route} ({r} and {route} must be paths of the same State Root)
        page(routeState, route)

        continue
      }

      // Define Page with {r} as state and {route}
      this._defPageRoute(routeState, route)
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

      // Set current state root {this._stateRoot}
      const stateRoot = this._stateRoot
      // Set current state {this._state}
      const fromState = this._state
      // Set current route {this._route}
      const fromRoute = this._route
      // Set next state {state}
      const toState = state
      // Set next route {route}
      const toRoute = route

      // Set ctx as {ctx}
      this._ctx = ctx
      // Set state as {toState}
      this._state = toState
      // Set state as {toRoute}
      this._route = toRoute

      // Emit event state.change
      this._emitChangeState({
        'ctx': ctx,
        'stateRoot': stateRoot,
        'from': {
          'state': fromState,
          'route': fromRoute
        },
        'to': {
          'state': toState,
          'route': toRoute
        }
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
   * Set current state root
   * @created 2017-03-21T18:57:27-0300
   * @param   {string}                 newStateRoot State Root to be set
   * @return  {none}                                no-return
   */
  set stateRoot(newStateRoot) {
    console.log('[Page] set stateRoot.{this._stateRoot}: ' + this._stateRoot)
    console.log('[Page] set stateRoot.{newStateRoot}: ' + newStateRoot)

    this._stateRoot = newStateRoot
  }
  /**
   * Get current state root
   * @created 2017-03-21T18:58:32-0300
   * @return  {string}                 Current state root
   */
  get stateRoot() {
    return this._stateRoot
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
    this._route = this._getStateRoute(newState)
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
   * @param   {string}                 stateRoot Current Root State
   * @param   {string}                 state     Current State
   * @return  {none}                             no-return
   */
  handleOnMount(stateRoot, state) {
    console.log('[Page] handleOnMount.{stateRoot}: ' + stateRoot)
    console.log('[Page] handleOnMount.{state}: ' + state)

    // Set current stateRoot
    this._stateRoot = stateRoot
    // Set current state
    if(state) {
      this.state = state
    }
    // Initialize Page
    this._pageInit()
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
    stateRoot = stateRoot || this._stateRoot

    console.log('[Page] goTo.{state}: ' + state)
    console.log('[Page] goTo.{params}: ' + JSON.stringify(params))
    console.log('[Page] goTo.{stateRoot}: ' + stateRoot)

    const url = this._getStatePathUrl(state, params, stateRoot)

    if(stateRoot !== this._stateRoot) {
      // Set Page Base to new State Root

      this.goToExternalUrl(url)

      return
    }

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
  _pageInit() {
    console.log('[Page] _pageInit.{this}: ')
    console.log(this)

    // Define Page Base
    this._defPageBase()
    // Define Page Default
    this._defPageDefault()
    // Define Page Routes
    this._defPageRoutes()

    // Start Page
    page()

    // Emit Page has been Initialized
    this._emitPageInit({
      'state': this._state,
      'stateRoot': this._stateRoot
    })
  }
}

module.exports = AppPage
