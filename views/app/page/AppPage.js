/*
* @Author: Matteo Zambon
* @Date:   2017-03-18 17:26:56
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-03-19 23:26:41
*/

'use strict'

const EventEmitter = require('events')
const page = require('page')

class AppPage extends EventEmitter {
  constructor() {
    super()

    console.log('>>> Page - constructor')

    this._currentPath = null
    this._currentHandler = null
    this._currentCtx = null
    this._base = '/'
    this._routes = []
  }

  set currentPath(newCurrentPath) {
    console.log('>>> Page - set currentPath')
    console.log(this._currentPath)
    console.log(newCurrentPath)

    this._currentPath = newCurrentPath
  }
  get currentPath() {
    console.log('>>> Page - get currentPath')
    console.log(this._currentPath)

    return this._currentPath
  }

  set currentHandler(newCurrentHandler) {
    console.log('>>> Page - set currentHandler')
    console.log(this._currentHandler)
    console.log(newCurrentHandler)

    this._currentHandler = newCurrentHandler
  }
  get currentHandler() {
    console.log('>>> Page - get currentHandler')
    console.log(this._currentHandler)

    return this._currentHandler
  }

  set currentCtx(newCurrentCtx) {
    console.log('>>> Page - set currentCtx')
    console.log(this._currentCtx)
    console.log(newCurrentCtx)

    this._currentCtx = newCurrentCtx
  }
  get currentCtx() {
    console.log('>>> Page - get currentCtx')
    console.log(this._currentCtx)

    return this._currentCtx
  }

  set base(newBase) {
    console.log('>>> Page - set base')
    console.log(this._base)
    console.log(newBase)

    this._base = newBase
  }
  get base() {
    console.log('>>> Page - get base')
    console.log(this._base)

    return this._base
  }

  set routes(newRoutes) {
    console.log('>>> Page - set routes')
    console.log(this._routes)
    console.log(newRoutes)

    this._routes = newRoutes
  }
  get routes() {
    console.log('>>> Page - get routes')
    console.log(this._routes)

    return this._routes
  }

  onMount(args) {
    console.log('>>> Page - onMount')
    console.log(this)
    console.log(args)

    this._currentPath = args.currentPath || null
    this._currentCtx = null
    this._base = args.base || '/'
    this._routes = args.routes || []

    this._setPage()
  }
  onUpdate(rootComponent) {
    console.log('>>> Page - onUpdate')
    console.log(this)
    console.log(rootComponent)

    rootComponent[this._currentHandler](this._currentCtx)
  }
  goTo(pageTo) {
    console.log('>>> Page - goTo')
    console.log(this)
    console.log(pageTo)

    page(pageTo)
  }

  _setPage() {
    console.log('>>> Page - _setPage')
    console.log(this)

    // Set base path
    page.base(this._base)

    // Add routes
    for(const r in this._routes) {
      const route = this._routes[r]

      this._addRoute(route)
    }

    this._addRouteNotFound()

    page()
  }
  _addRoute(route) {
    console.log('>>> Page - _addRoute')
    console.log(this)
    console.log(route)

    if(route.redirectTo) {
      page(route.path, route.redirectTo)
    }
    else {
      if(route.isRoot) {
        page('/', route.isRoot)
      }

      page(route.path, (ctx) => {
        console.log('>>> Page - Found')
        console.log(ctx.path)
        console.log(ctx)
        console.log(route)

        this._emitChangePath(this._currentPath, route.path)

        this._currentPath = route.path
        this._currentCtx = ctx
        this._currentHandler = route.handler
      })
    }
  }
  _addRouteNotFound() {
    console.log('>>> Page - _addRouteNotFound')
    console.log(this)

    page('*', (ctx) => {
      console.log('>>> Page - Not Found')
      console.log(ctx.path)
      console.log(ctx)

      this._emitChangePath(this._currentPath, 'notfound')

      this._currentPath = 'notfound'
      this._currentCtx = ctx
    })
  }
  _emitChangePath(currentPath, nextPath) {
    console.log('>>> Page - _emitChangePath')
    console.log(this)
    console.log(currentPath)
    console.log(nextPath)

    const a = this.emit('change', {
      'from': currentPath,
      'to': nextPath
    })

    console.log(a)
  }
}

module.exports = AppPage
