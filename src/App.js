import './App.scss';
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import UsersScreen from "./screens/UsersScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import PackageScreen from "./screens/PackageScreen";
import LoginScreen from "./screens/LoginScreen";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Router>

                <Switch>
                  <Route exact path='/' component={HomeScreen}/>
                  <Route exact path='/login' component={LoginScreen}/>
                  <Route exact path='/users' component={UsersScreen}/>
                  <Route exact path='/subscription' component={SubscriptionScreen}/>
                  <Route exact path='/packages' component={PackageScreen}/>

                </Switch>


            </Router>
        </>
    );
}

export default App;
