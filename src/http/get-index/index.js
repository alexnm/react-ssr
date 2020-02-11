let arc = require('@architect/functions')
let { render } = require('@architect/views/dist/render')

async function app(req) {
  return { html: await render(req.path) }
}

exports.handler = arc.http.async(app)
