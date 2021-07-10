import React from 'react'
import {Link} from 'react-router-dom'
import { Component } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
class Forgetpass extends Component {
    constructor(props) {
        super(props)

        this.state = {
            error:null,
            email:null
        }
    }
    
    onEmailChange=(e)=>{
        let temperror=[]
        let errorfield=document.getElementById("errorfield")
        if(!e.target.value)
        {
            temperror["email"]="Email Required!"
            errorfield.style.color="red"
            e.target.style.border="1px solid red"
            this.setState({
                error:temperror,
                email:null
            })
        }
        else if( !validateEmail(e.target.value))
        {
            temperror["email"]="Invalid Email Syntax!"
            errorfield.style.color="red"
            e.target.style.border="1px solid red"
            this.setState({
                error:temperror,
                email:null
            })
        }
        else{
            errorfield.style.color="green"
            e.target.style.border="1px solid green"
            this.setState({
                error:null,
                email:e.target.value
            })
        }
    }

    sentPassword=()=>{
        if(this.state.email)
        {
            axios({
               method:"post",
               url:"https://apibyashu.herokuapp.com/api/recoverpassword",
               data:{"email":this.state.email}, 
            }).then((response)=>{
                console.log("Success from forget password",response.data)
                if(response.data.message[0]=="N")
                {
                    toast.error(response.data.message)
                }
                else{
                    toast.success(response.data.message)
                }
               
            },(error)=>{
                console.log("error from forget password",error)
            })
        }
        else{
            toast.error("Email Required!!")
        }
    }
    render() {
        return (
            <div className="container p-3" style={{ textAlign:"left",marginTop:"10%",width:"40%",borderRadius:'10px',backgroundColor:"rgba(60,80,220,0.1)",boxShadow:"1px 1px 10px gray"}}>
            <div className="row justify-content-center">
                <div className="col-sm-7">
    
                    <form id="form">
                        <h3>Forget Password?</h3><br></br>
    
                        <div class="form-group">
                            <span id="errorfield" >{this.state.error && this.state.error.email}</span>
                            <input type="email" name="emailfield" class="form-control" id="" placeholder="Email_Id (Required..)"  onChange={this.onEmailChange}/><br></br>
                           
                        </div>
                        <div class="form-group " style={{textAlign:"left"}}>
                            <button type="button" class="btn btn-primary" onClick={this.sentPassword}>Sent Password</button>
                           
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default Forgetpass
