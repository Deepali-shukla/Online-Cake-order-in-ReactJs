import {Component} from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
class SignUp extends Component
{
    constructor()
    {
        super()
        this.state={
            errors:null,
            user:null
        }
    }

    emailHandle = (event)=>
    {
            
             if(!event.target.value)
             {
                 this.setState(
                   { errors: {
                         email:"Email is Requierd"
                     }}
                 )
                 event.target.style.border="2px solid red"
             }
             else if(!validateEmail(event.target.value)) {
                this.setState(
                    { errors: {
                        email:"Email is Invalid!!"
                    }}
                )
                event.target.style.border=" 1px solid red"
            }
            else if(validateEmail(event.target.value)) {
                this.setState(
                    { errors: {
                        email:null
                    }}
                )
                event.target.style.border="1px solid green"
            }

    }

    passHandle = (event)=>
    {
            
             if(!event.target.value)
             {
                 this.setState(
                   { errors: {
                         password:"password is Requierd"
                     }}
                 )
                 event.target.style.border="2px solid red"
             }
             else if(!validatePassword(event.target.value)) {
                this.setState(
                    { errors: {
                        password:"Password should contains minimum 8 letters with at least a symbol, upper and lower case letters and a number"
                    }}
                )
                event.target.style.border=" 1px solid red"
            }
            else if(validatePassword(event.target.value)) {
                this.setState(
                    { errors: {
                        password:null
                    }}
                )
                event.target.style.border="1px solid green"
            }
            else
              {
                this.setState({
                    user:{
                    name:document.getElementById("email").value,
                   passw:document.getElementById("pass").value
                   }
                },()=> console.log(this.state.user)) 
           
               }

 }
    repassHandle =(event)=>{

        if(event.target.value == document.getElementById("pass").value)
        {
            this.setState(
              { errors: {
                    repass:"Password Matched"
                }}
            )
            event.target.style.border="2px solid green"
         } 
         else
         {
            this.setState(
                { errors: {
                      repass:"Password MisMatch"
                  }}
              )
              event.target.style.border="2px solid red"
              event.target.style.color="GREEN"
         } 
}

   validate=(event)=>
   {
    event.preventDefault()
    this.setState({
        user:{
            email:document.getElementById("email").value,
            password:document.getElementById("pass").value,
            name:"Infobeans"
        }
    },()=> 
     axios (
         {
             url:'https://apibyashu.herokuapp.com/api/register',
             method:'post',
             data:this.state.user}
        ).then((response)=>
        {
            console.log(response)
            toast.success(response.data.message)
        },(error)=>
        {
            console.log(error)}
        )
    ) 
   
   }







    render()
    {
        return(
            <div className="container p-3" style={{margin:"auto",width:"40%",borderRadius:'10px',backgroundColor:"rgba(60,80,220,0.1)",boxShadow:"1px 1px 10px gray"}}>
            <div className="row justify-content-center">
                <div className="col-sm-7">
    
                    <form id="loginform" >
                        <h3>SignUp Form</h3><br></br>
    
                        <div className="form-group">
                        <label style={{color:"red"}} className="form-text">{this.state.errors && this.state.errors.email}</label>
    
                            <input name="emailfield" type="email" className="form-control" onChange={this.emailHandle} id="email" placeholder="Enter Email address"  /><br></br>
                        </div>
                        {<div className="form-group">
                        { <label style={{color:"red"}} className="form-text">{this.state.errors && this.state.errors.password}</label> }
    
                            <input type="password" name="passfield" onChange={this.passHandle} className="form-control" id="pass" placeholder="Enter Password"  /><br></br>
                        </div> }
                        {<div className="form-group">
                        <label style={{color:"red"}} className="form-text">{this.state.errors && this.state.errors.repass}</label>
    
                            <input type="password" name="passfield" className="form-control" id="repass" onChange={this.repassHandle} placeholder="Re-Enter Password"  /><br></br>
                        </div> }
                        <div className="form-group " style={{textAlign:"left"}}>
                            { <button  type="button"  onClick={this.validate} className="btn btn-primary">Sign Up</button> }
                        </div>
                        {/* {this.state.errorMsg && <h6 style={{color:"red"}}>{this.state.errorMsg}</h6>} */}
                    </form>
    
                </div>
            </div>
        </div> 
        )
    }
}

export default SignUp