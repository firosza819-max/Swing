import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/category1">
          <h1>Category 1</h1>
        </Route>
        <Route path="/category2">
          <h1>Category 2</h1>
        </Route>
        <Route path="/category3">
          <h1>Category 3</h1>
        </Route>
        <Route path="/category4">
          <h1>Category 4</h1>
        </Route>
        <Route path="/category5">
          <h1>Category 5</h1>
        </Route>
        <Route path="/category6">
          <h1>Category 6</h1>
        </Route>
        <Route path="/category7">
          <h1>Category 7</h1>
        </Route>
        <Route path="/category8">
          <h1>Category 8</h1>
        </Route>
        <Route path="/category9">
          <h1>Category 9</h1>
        </Route>
        <Route path="/category10">
          <h1>Category 10</h1>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;