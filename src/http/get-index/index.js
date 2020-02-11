let arc = require('@architect/functions')
let { render } = require('@architect/views/dist/render')
let express = require('express')
let app = express()

app.get('/*', async function catchall(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(await render(req.url))
})

exports.handler = arc.http.express(app)
