let arc = require('@architect/functions')
let { render } = require('@architect/views/dist/render')

async function app(req) {
  console.time('render')
  let html = await render(req.path) 
  console.timeEnd('render')
  return { html }
}

exports.handler = arc.http.async(app)
