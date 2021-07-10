import axios from "axios";
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var tempitem={}
toast.configure();
class AddCake extends Component {
  constructor(props) {
    super(props);

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
    tempitem["price"] = form["elements"]["price"].value;
    tempitem["description"] = form["elements"]["description"].value;
    tempitem["type"] = form["elements"]["category"].value;
     let tempimg = form["elements"]["image"].value;
    tempitem["ratings"] = form["elements"]["ratings"].value;
    tempitem["weight"] = form["elements"]["weight"].value;
    tempitem["eggless"] = form["elements"]["eggless"].checked;
    tempitem["ingredients"] = form["elements"]["ingredients"].value;
    
    // console.log(tempitem)
    let flag = 1;

    if (!tempitem["name"]) {
      error["name"] = "Enter CakeName!";
      flag = 0;
    }
    if (!tempitem["price"]) {
      error["price"] = "Enter Price!";
      flag = 0;
    }
    if (!tempitem["weight"]) {
      error["weight"] = "Enter Weight!";
      flag = 0;
    }
    if (!tempitem["description"]) {
      error["description"] = "Enter Description!";
      flag = 0;
    }
    if (tempitem["type"] == 1) {
      flag = 0;
      error["type"] = "Enter Category!";
    }
    if (!tempimg) {
      error["image"] = "Choose Image!";
      flag = 0;
    }
    if (!tempitem["ratings"]) {
      error["ratings"] = "Enter rating!";
      flag = 0;
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
      //  document.getElementById("toastmsg").style.toastClassName="Toastify__toast--error"
    } else {
      toast.success("Success");
      this.setState(
        {
          newitem: tempitem,
          errors: null,
          flag: 1,
        },
        () => {
            var errorfields = Object.keys(error);
            if(errorfields.length <= 0){
                var cake ={}
                toast.success("Product is added")
                for(var i=0 ; i<form.elements.length ; i++){
                    cake[form.elements[i].name] = form.elements[i].value
                }
                
                cake.eggless = form.elements.eggless.checked
                cake.ingredients = cake.ingredients.split(',')
                cake.image = tempitem["image"]
                axios({
                  url : "https://apibyashu.herokuapp.com/api/addcake",
                  method : "post",
                  data : cake,
                 headers:{
                     authtoken:localStorage.token
                  }
              }).then((response)=>{
                 console.log("response from addcake api",response)
             },(error)=>{
                 console.log("error from addcake api",error)
              })
                console.log(cake)
            }
            else{
                toast.error("there is error in form")
            }
        }
      );
      // document.getElementById("toastmsg").style.toastClassName="Toastify__toast--success"
   
   
    }
       
    // var form=document.getElementById('form');

    // if(!form["elements"]["emailfield"].value)
  };

   
  onfileUpload = (e) => {
    // console.log("Image uploading here", e.target.files[0])
    var formdata = new FormData();
    formdata.append("file", e.target.files[0]);

    axios({
      method: "POST",
      url: "https://apibyashu.herokuapp.com/api/upload",
      data: formdata,
      headers: {
        authtoken: localStorage.token,
      },
    }).then(
      (response) => {
        console.log("Rersponse from upload ApI" + response);
        if (response.data.imageUrl) {
          console.log("My IMG DATA: " + response.data.imageUrl);
          tempitem["image"]=response.data.imageUrl
        }
      },
      (error) => {
        console.log("errors in API", error);
      }
    );

    this.setState(
      {
        selectedFile: URL.createObjectURL(e.target.files[0]),
        
      },
      () => console.log(e.target.files[0])
    );
  };
  render() {
    return (
      <div
        className="container p-3"
        style={{
          textAlign: "left",
          marginTop: "6%",
          width: "70%",
          borderRadius: "10px",
          backgroundColor: "rgba(60,80,220,0.1)",
          boxShadow: "1px 1px 10px gray",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-sm-7">
            <form id="form">
              <h3>Add Item</h3>
              <br></br>

              <div class="form-group">
                <span style={{ color: "red" }}>
                  {this.state.errors && this.state.errors.cakename}
                </span>
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="Enter Cake Name"
                />
                <br></br>
              </div>
              <div class="form-group">
                <label style={{ color: "red" }}>
                  {this.state.errors && this.state.errors.image}
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  class="form-control"
                  placeholder="Enter Image path"
                  onChange={this.onfileUpload}
                />
                <br></br>
                {this.state.selectedFile && (
                  <img src={this.state.selectedFile} alt="cake.jpg" />
                )}
              </div>
              <div class="form-group">
                <label style={{ color: "red" }}>
                  {this.state.errors && this.state.errors.price}
                </label>
                <input
                  type="text"
                  name="price"
                  class="form-control"
                  placeholder="Enter Price"
                />
                <br></br>
              </div>
              <div class="form-group">
                <label style={{ color: "red" }}>
                  {this.state.errors && this.state.errors.weight}
                </label>
                <input
                  type="number"
                  name="weight"
                  class="form-control"
                  placeholder="Enter Weight"
                />
                <br></br>
              </div>

              <div className="checkbox">
                <label>
                  <input type="checkbox" value=""   name="eggless"
                  />
                  Eggless
                </label>
              </div>
              <br></br>
              <div class="form-group">
                <span style={{ color: "red" }}>
                  {this.state.errors && this.state.errors.ingredients}
                </span>
                <input
                  type="text"
                  name="ingredients"
                  class="form-control"
                  placeholder="Enter Ingredients"
                />
                <br></br>
              </div>
              <div class="form-group">
                <label style={{ color: "red" }}>
                  {this.state.errors && this.state.errors.category}
                </label>
                <select
                  id="category"
                  name="type"
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option value="1">Categories</option>
                  <option value="Birdthday Cake">Birthday Cake</option>
                  <option value="Wedding Cake">Wedding Cake</option>
                  <option value="Anniversary Cake">Anniversary Cake</option>
                </select>
              </div>

              <div class="form-group">
                <label style={{ color: "red" }}>
                  {this.state.errors && this.state.errors.description}
                </label>
                <textarea
                  rows="4"
                  cols="80"
                  name="description"
                  class="form-control"
                  placeholder="Enter Description"
                />
                <br></br>
              </div>

              <div class="form-group">
                <label style={{ color: "red" }}>
                  {this.state.errors && this.state.errors.rating}
                </label>
                <input
                  type="number"
                  name="ratings"
                  class="form-control"
                  placeholder="Give Rating"
                />
                <br></br>
              </div>

              <div class="form-group " style={{ textAlign: "left" }}>
                <button
                  type="submit"
                  class="btn btn-primary"
                  onClick={this.displayCredentials}
                >
                  Add Cake
                </button>
              </div>
              {/* <ToastContainer id="toastmsg" toastClassName={(this.state.flag)?("Toastify__toast--success"):("Toastify__toast--error")}/> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddCake;
