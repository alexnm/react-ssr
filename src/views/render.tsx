import React from "react";
import serialize from "serialize-javascript";
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import routes from "./routes";
import Layout from "./components/Layout";
import createStore, { initializeSession } from "./store";


export async function render(path) {

  const store = createStore( );
  store.dispatch( initializeSession( ) );

  const dataRequirements = routes.filter( route => matchPath( path, route ) ) // filter matching paths
          .map( route => route.component ) // map to components
          .filter( comp => comp.serverFetch ) // check if components have data requirement
          .map( comp => store.dispatch( comp.serverFetch( ) ) ); // dispatch data requirement

  await Promise.all( dataRequirements )
  const jsx = (
      <ReduxProvider store={ store }>
        <StaticRouter context={ context } location={ path }>
          <Layout />
        </StaticRouter>
      </ReduxProvider>
  );
  const reactDom = ReactDOMServer.renderToString( jsx );
  const reduxState = store.getState( );
  const helmetData = Helmet.renderStatic( );

  return htmlTemplate( reactDom, reduxState, helmetData ) 
}

function htmlTemplate( reactDom, reduxState, helmetData ) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset=utf-8>
  ${ helmetData.title.toString( ) }
  ${ helmetData.meta.toString( ) }
  <title>React SSR</title>
  <link rel=stylesheet type=text/css href=/_static/index.css>
</head>
<body>
<div id=app>${ reactDom }</div>
<script>
window.REDUX_DATA = ${ serialize( reduxState, { isJSON: true } ) }
</script>
<script src=/_static/client.js></script>
</body>
</html>`
}
