/*
* @Author: Matteo Zambon
* @Date:   2017-02-14 22:57:46
* @Last Modified by:   Matteo Zambon
* @Last Modified time: 2017-02-23 18:52:09
*/

'use strict'

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // Plugins
  'plugins': [
    // Allows Sass files to be rendered to CSS
    'lasso-sass',
    // Allows Marko templates to be compiled and transported to the browser
    'lasso-marko',
    // Allows Images
    'lasso-image',
    {
      'plugin': 'minprops/lasso',
      'enabled': isProduction
    }
  ],
   // Place all generated JS/CSS/etc. files into the "static" dir
  // 'outputDir': './static',
  // Only enable bundling in production
  'bundlingEnabled': isProduction,
  // Only minify JS and CSS code in production
  'minify': isProduction,
  // Only add fingerprints to URLs in production
  'fingerprintsEnabled': isProduction,
  // Group each dependencies in different bundles
  'bundles': [
    // jQuery
    require('./bundles/jquery'),
    // Pace
    require('./bundles/pace'),
    // PageJs
    require('./bundles/page')
  ]
}
