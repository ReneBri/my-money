// styles
import './App.css'

// components
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './components/Navbar'

// hooks
import { useAuthContext } from './hooks/useAuthContext'

function App() {

  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>

        <Navbar />

          <Switch>
            <Route exact path='/'>
              {user && <Home />}
              {!user && <Redirect to="/login" />}
            </Route>

            <Route path='/login'>
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>

            <Route path='/signup'>
              {!user && <Signup />}
              {user && <Redirect to="/" />}
            </Route>
          </Switch>

        </BrowserRouter>
      )}
    </div>
  );
}

export default App
