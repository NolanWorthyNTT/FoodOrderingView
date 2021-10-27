import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Login from './components/Login.js';
import Menu from './components/Menu.js';
import Admin from './components/Admin.js';
import Orders from './components/Orders.js';

function App() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [cart, setCart] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header role={role} setRole={setRole} username={username} setUsername={setUsername} />
          <Switch>
            <Route exact path='/'>
              <Login role={role} setRole={setRole} username={username} setUsername={setUsername} />
            </Route>

            <Route path='/admin'>
              <Admin />
            </Route>

            <Route path='/menu'>
              <Menu cart={cart} setCart={setCart} />
            </Route>

            <Route path='/orders'>
              <Orders />
            </Route>
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
