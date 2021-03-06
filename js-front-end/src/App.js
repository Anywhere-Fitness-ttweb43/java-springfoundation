import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import GetUserInfo from "./components/UserInfo";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import HomePage from './components/HomePage'
import AllClasses from './components/AllClasses'
import Search from './components/Search'
import Nav from './components/Nav'
import newClass from "./components/NewClassForm"


function App() {
	return (
		<div className="App" style={ {padding: 0, margin: 0} }>
			<Nav />

			<Route exact path="/" component={HomePage} />
			<Route exact path="/all" component={AllClasses} />
			<Route exact path="/search" component={Search} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/newClass" component={newClass} />
			<ProtectedRoute exact path="/userinfo" component={GetUserInfo} />
			<Route exact path='/register' component={Register}/>
				
			
		</div>
	);
}

export default App;
