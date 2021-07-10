import {Component} from "react" 
import {Link, withRouter} from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
toast.configure();

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validatePassword(password)
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

class Login extends Component{
    constructor(){
        super()
        this.state={
            errors:null,
            user:null
        }
    }
login(event){
    event.preventDefault()
    this.setState({
        errors:null
    })
    var form = document.getElementById('loginform')
    
    if (!form["elements"]["emailfield"].value && !form["elements"]["passfield"].value )
    {
              this.setState({
                  errors: {
                    email:"Email is Required",
                    password:"password is required"
                  }
              })
              form["elements"]["emailfield"].style["border-color"]="red"
              form["elements"]["passfield"].style["border-color"]="red"

    }
     else if(!form["elements"]["emailfield"].value){
        this.setState({
            errors:{
                email:"Email is Required"
            }
        })
        form["elements"]["emailfield"].style["border-color"]="red"
    }
     else if (!validateEmail(form["elements"]["emailfield"].value)){
       this.setState({
           errors:{
               email:"Invalid Email Syntax"
           }
       })
       form["elements"]["emailfield"].style["border-color"]="red"

    }

    else if (!form["elements"]["passfield"].value)
    {
        this.setState({
            errors:{
                password:"password is required"
            }
        })
        form["elements"]["emailfield"].style["border-color"]="red"
    }
    else if (!validatePassword(form["elements"]["passfield"].value))
    {
        this.setState({
            errors:{
                password:"Password should contains minimum 8 letters with at least a symbol, upper and lower case letters and a number"
            }
        })
        form["elements"]["passfield"].style["border-color"]="red"
    }
    else
    {
        this.setState({
            user:{
                email:document.getElementById("email").value,
                password:document.getElementById("pass").value
            }
        },()=>  axios (
            {url:'https://apibyashu.herokuapp.com/api/login',
            method:'post',
            data:this.state.user
        }).
        then(
            (response)=>
            {
                console.log("response from server",response)
                
                if(response.data.token)
                {
                    toast.success(response.data.message)
                    localStorage.token=response.data.token
                    localStorage.email=response.data.email
                    localStorage.name=response.data.name
                    // this.props.inform_login
                    this.props.dispatch ({
                        type:"LOGIN"
                    })
                    this.props.history.push("/")
                    
                }
                else
                {
                    toast.error(response.data.message)
                }
            },
            (error)=>
            {
                console.log(error)
            }
            )) 
        
        }
}
render(){
    return(
        <div className="container p-3" style={{margin:"auto",width:"40%",borderRadius:'10px',backgroundColor:"rgba(60,80,220,0.1)",boxShadow:"1px 1px 10px gray"}}>
        <div className="row justify-content-center">
            <div className="col-sm-7">

                <form id="loginform" >
                    <h3>Login Form</h3><br></br>

                    <div class="form-group">
                    <label style={{color:"red"}} class="form-text">{this.state.errors && this.state.errors.email}</label>

                        <input name="emailfield" type="email" class="form-control" id="email" placeholder="Enter Username"  /><br></br>
                    </div>
                    {<div class="form-group">
                    <label style={{color:"red"}} class="form-text">{this.state.errors && this.state.errors.password}</label>

                        <input type="password" name="passfield" class="form-control" id="pass" placeholder="Enter Password"  /><br></br>
                    </div> }
                    <div>
                      <Link to="/forgot">Forgot Password?</Link> 
                    </div> <br></br>
                    <div class="form-group " style={{textAlign:"left"}}>
                        <button onClick={this.login.bind(this)} type="submit" class="btn btn-primary">Login</button>
                    </div>
                    <div>
                    New User? <Link to="/signup">Sign In Now</Link> 
                    </div>
                   
                    {/* {this.state.errorMsg && <h6 style={{color:"red"}}>{this.state.errorMsg}</h6>} */}
                </form>

            </div>
        </div>
    </div> 
    )
}
}

 var login= withRouter(Login)
export default connect()(login)