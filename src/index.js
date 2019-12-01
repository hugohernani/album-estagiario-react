import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import PageAlbums from './components/PageAlbums';
import Album from './components/Album'
import * as serviceWorker from './serviceWorker';

const Routes = () => (
  <Router>
    <div className="section container">
      <Switch>
        <Route exact path="/albums" component={PageAlbums}></Route>
        <Route exact path="/albums/:id" component={Album}></Route>
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(<Routes />, document.getElementById('root'));

serviceWorker.unregister();
