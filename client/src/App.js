/* this is previous code form the book app in class

import React from "react";
import Books from "./pages/Books";
import Nav from "./components/Nav";

const App = () => (
  <div>
    <Nav />
    <Books />
  </div>
);
export default App;
*/

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () =>
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Books} />
        <Route exact path="/books" component={Books} />
        <Route exact path="/books/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;