import './App.css';
import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import AuthService from "./services/auth";

function App() {

    const [currentUser, setCurrentUser] = useState(undefined)


    useEffect(()=>{
        const user = AuthService.getCurrentUser();
        if(user){
            setCurrentUser(user);
        }
    },[])

    const logOut = function () {
        AuthService.logout();
    }



    return (
    <Router>
        <div className="App">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {!currentUser ? (
                    <>
                    <li>
                        <Link to="/login">Sign in</Link>
                    </li>
                    <li>
                        <Link to="/register">Sign up</Link>
                    </li>
                    </>
                    ) : (
                        <li>
                            <a href="/" onClick={logOut}>Logout</a>
                        </li>
                    )}
                </ul>
            </nav>
            <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
            </Switch>
        </div>
    </Router>
  );
}

export default App;
