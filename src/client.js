import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Layout from "./components/Layout";

const jsx = (
    <Router>
        <Layout />
    </Router>
);

const app = document.getElementById( "app" );
ReactDOM.hydrate( jsx, app );
