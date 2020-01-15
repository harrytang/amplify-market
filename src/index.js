/*
 * @Author: Harry Tang - harry@powerkernel.com 
 * @Date: 2020-01-15 19:01:53 
 * @Last Modified by:   Harry Tang - harry@powerkernel.com 
 * @Last Modified time: 2020-01-15 19:01:53 
 */
import React from "react";
import ReactDOM from "react-dom";
import Amplify from "aws-amplify";

import aws_exports from "./aws-exports";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

Amplify.configure(aws_exports);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
