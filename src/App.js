import logo from './logo.svg';
import './App.css';
import {Component,React} from "react"
import Home from "./Component/Home"
import {BrowserRouter as Router,Route, Switch} from "react-router-dom"
import Navbar from './Component/Navbar';
import Search from './Component/Search';
import CakeDetails from './Component/CakeDetails'
import Forgotpass from "./Component/Forgotpass"
import Login from './Component/Login';
import CartItem from "./Component/CartItem"
import AddCake from "./Component/AddCake"
import MyOrder from "./Component/MyOrder"
import {ToastContainer , toast} from "react-toastify"

import "react-toastify/dist/ReactToastify.css";
import SignUp from './Component/SignUp';
import CartList from './Component/CartList';
import CheckOut from './Component/CheckOut';
import PageNotFound from "./Component/PageNotFound"

class App extends Component {
  loginDone = ()=>{
    alert("Login Done")
    this.setState({
        isLoggedin: true
    })
}
constructor(){
    super()
    if(localStorage.token)
    {
        this.state = {
            isLoggedin: true
        }
    }
    else
    {
        this.state = {
            isLoggedin: false
        }
    }
}
render(){
  return (
    <div className="App">
      <Router>
        <ToastContainer/>
        <Navbar isLoggedin={this.state.isLoggedin}></Navbar>
        <Switch>
       
        <Route exact path="/search" component={Search}/>
        <Route exact path="/showcake/:cakeid" component={CakeDetails}/>
        <Route exact path="/forgot" component={Forgotpass}/>
        <Route  exact path="/addcake" component={AddCake}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/cartitem" component={CartItem}/>
        <Route exact path="/cart" component={CartList}/>
        <Route exact path="/checkout" component={CheckOut}/>
        <Route exact path="/myorder" component={MyOrder}/>
        <Route exact path="/login"><Login inform_login={this.loginDone}></Login></Route>
        <Route exact path="/" component={Home}/>
        <Route exact path="**" component={PageNotFound}></Route> </Switch>
      </Router>
      
    </div>
  );
}
}

export default App;
