const { createProxyMiddleware } = require('http-proxy-middleware')
const proxy = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(createProxyMiddleware('/api/', { target: 'http://localhost:7000' }))
  app.use(createProxyMiddleware('/auth/', { target: 'http://localhost:7000' }))
}
