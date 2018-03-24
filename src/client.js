import React from "react";
import ReactDOM from "react-dom";

import Layout from "./components/Layout";

const app = document.getElementById( "app" );
ReactDOM.hydrate( <Layout />, app );
