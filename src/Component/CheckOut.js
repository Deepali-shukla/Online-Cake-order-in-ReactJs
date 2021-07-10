import axios from "axios";
import React, { PureComponent } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import queryparser from "query-string"
import queryString from 'query-string'
import CheckOutItem from "./checkOutItem";
var tempitem = {}
toast.configure();

class CheckOut extends PureComponent {

  constructor(props) {
    super(props);
    console.log("data hmne state se receive kr liya h", this.props.location.state)
    console.log(this.props.location.state.price)
    var cakes = this.props.location.state.cakes
    this.state = {
      errors: null,
      newitem: {},
      selectedFile: null,
      // flag:1
    };
  }



  displayCredentials = (e) => {

    let error = {};
    let form = e.target.form;
    // console.log(form)
    e.preventDefault();
    tempitem["name"] = form["elements"]["name"].value;
    tempitem["city"] = form["elements"]["city"].value;
    tempitem["pincode"] = form["elements"]["pincode"].value;
    tempitem["address"] = form["elements"]["address"].value;

    tempitem["phone"] = form["elements"]["mobile"].value;
    tempitem["price"] = this.props.location.state.price
    tempitem["email"] = localStorage.email
    tempitem["cakes"] = this.props.location.state.cakes
    console.log(tempitem)


    // console.log(tempitem)
    let flag = 1;

    if (!tempitem["name"]) {
      error["name"] = "please Enter Your Name!";
      flag = 0;
    }
    if (!tempitem["city"]) {
      error["city"] = "Please Enter Your City!";
      flag = 0;
    }
    if (!tempitem["pincode"]) {
      error["pincode"] = "Please Enter PinCode!";
      flag = 0;
    }
    if (!tempitem["address"]) {
      error["address"] = "Please Enter Address!";
      flag = 0;
    }
    if (!tempitem["phone"]) {
      flag = 0;
      error["mobile"] = "Please Enter Mobile!";
    }



    if (flag == 0) {
      this.setState(
        {
          errors: error,
          flag: 0,
          newitem: {},
        },
        () => toast.error("Errors in form!!!!")
      );

    }
    else {
      axios({
        url: "https://apibyashu.herokuapp.com/api/addcakeorder",
        method: "post",
        data: tempitem,
        headers: {
          authtoken: localStorage.token
        }
      }).then((response) => {
        console.log("response from addcake api", response.data)
        toast.success("Order Placed")
      
      }, (error) => {
        console.log("error from addcake api", error)
      })
      this.props.history.push("/myorder")
    }


  };



  render() {
    return (<div class="container" style={{
             textAlign: "left",
             marginTop: "6%",
             width: "70%",
             borderRadius: "10px",
             backgroundColor: "rgba(60,80,220,0.1)",
             boxShadow: "1px 1px 10px gray",
           }}>

      <div class="row">

        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <form id="form">
            <center>
            <h3>CheckOut Form</h3>
            </center>
            
            <br></br>

            <div class="form-group">
              <span style={{ color: "red" }}>
                {this.state.errors && this.state.errors.name}
              </span>
              <input
                type="text"
                name="name"
                class="form-control"
                placeholder="Enter Your Name"
              />
              <br></br>
            </div>

            <div class="form-group">
              <label style={{ color: "red" }}>
                {this.state.errors && this.state.errors.city}
              </label>
              <input
                type="text"
                name="city"
                class="form-control"
                placeholder="Enter city"
              />
              <br></br>
            </div>
            <div class="form-group">
              <label style={{ color: "red" }}>
                {this.state.errors && this.state.errors.pincode}
              </label>
              <input
                type="text"
                name="pincode"
                class="form-control"
                placeholder="Enter pincode"
              />
              <br></br>
            </div>

            <div class="form-group">
              <label style={{ color: "red" }}>
                {this.state.errors && this.state.errors.mobile}
              </label>
              <input
                type="text"
                name="mobile"
                class="form-control"
                placeholder="Enter  Mobile-Number"
              />
              <br></br>
            </div>




            <div class="form-group">
              <label style={{ color: "red" }}>
                {this.state.errors && this.state.errors.address}
              </label>
              <textarea
                rows="2"
                cols="80"
                name="address"
                class="form-control"
                placeholder="Enter Adderss"
              />
              <br></br>
            </div>



            <div class="form-group " style={{ textAlign: "left" }}>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={this.displayCredentials}
              >
                PlaceOrder
                </button>
            </div>

            {/* <ToastContainer id="toastmsg" toastClassName={(this.state.flag)?("Toastify__toast--success"):("Toastify__toast--error")}/> */}
          </form>
        </div>

        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">

          <div class="row">
            
            <h3 style={{paddingLeft:"50px",}} >Your Cart</h3>
            
            
          </div> <br></br>

          <div class="row">



            {(this.props.location.state.cakes).length > 0 && <div >
              {
                (this.props.location.state.cakes).map((e, index) => {

                  return <CheckOutItem item={e}  ></CheckOutItem>
                })}

            </div>}

          </div><br></br>
          
          <div class="row">
               
               <div class=  "col-sm-4 ">
               <button type="button" class="btn btn-info">Total Rs : {this.props.location.state.price}</button>
               </div>
               
               <div class=" col-sm-4 ">
               <button type="button" class="btn btn-info">Items : {this.props.location.state.item}</button>
               </div>
               
               
          </div>
          

        </div>


      </div>

    </div>)

  }
}

export default CheckOut;