import { useParams, withRouter } from "react-router-dom";
import { useState } from "react";
import data from "./data";
import axios from "axios";
import "../styles/cakedetail.css"
import { toast } from "react-toastify";

function Cakedetails(props) {
 

  var { cakeid } = useParams();
  var [cake, setCake] = useState(data.cake);
  console.log(">>>>>>>>>>> cake id from data.js file", data.cake.cakeid);
  if (data.cake.cakeid != cakeid) {
    // bring all the details of that cake from backend
    var apiurl = "httpS://apibyashu.herokuapp.com/api/cake/" + cakeid;
    axios({
      url: apiurl,
      method: "get",
    }).then(
      (response) => {
        console.log("all the details of selected cake response", response);
        data.cake = response.data.data;
        setCake(response.data.data);
      },
      (error) => {
        console.log(">>>>> error from cake details api", error);
      }
    );
  }
  console.log("cake id", cakeid);
   
function AddtoCart(){

  alert()
  if(!localStorage.token){
    alert("Please login First")
    props.history.push("/login")
  }
else{
  var cakeObj={
    name:cake.name,
    price:cake.price,
    image:cake.image,
    cakeid : cake.cakeid,
    weight:cake.weight,
    email:localStorage.email,
  }
  console.log("object to be sent",cakeObj)

  axios({
    url:"https://apibyashu.herokuapp.com/api/addcaketocart",
    method:'post',
    data:cakeObj,
    headers:{
      authtoken:localStorage.token
  }
  }).then((response)=>{
    console.log("api add to cart",response)
    if(response.data.data){
        toast.success("Successfully added to cart")
    }
  },(error)=>{
    console.log("error api add to cart",error)
  })
  props.history.push("/cart")
}
}
  return (
    <div class="container" style={{marginTop:'20px'}}>
      <div class="card" >
        <div class="container-fliud">
          <div class="wrapper row">
            <div class="preview col-md-6">
              <div class="preview-pic tab-content">
                <div class="tab-pane active" id="pic-1">
                  <img src={cake.image} />
                </div>
              </div>
              <br/>
              <ul class="preview-thumbnail nav nav-tabs">
                <li>
                  <a data-target="#pic-2" data-toggle="tab">
                    {" "}
                    <b>Ingredient: </b>
                  </a>
                </li> &nbsp;
                {cake.ingredients &&
                  cake.ingredients.length > 0 &&
                  cake.ingredients.map((each) => {
                    return (
                      <li>
                        <a data-target="#pic-1" data-toggle="tab">
                          {each}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div class="details col-md-6">
              <h3 class="product-title">{cake.name}</h3>
              <div class="rating">
                <div class="stars">
                  <span class="fa fa-star checked">{cake.ratings}</span>
                </div>
                <span class="review-no">41 reviews</span>
              </div>
              <p class="product-description">{cake.description}</p>
              <h4 class="price">
                current price: <span>${cake.price}</span>
              </h4>
              <p class="vote">
                <strong>91%</strong> of buyers enjoyed this product!{" "}
                <strong>(87 votes)</strong>
              </p>
              <h5 class="sizes">
                Weight:
                <span class="size" data-toggle="tooltip" title="small">
                  {cake.weight}Kg
                </span>
              </h5>
              <h4 class="price">
                Flavour:{" "}
                <span>
                  <em>{cake.flavour}</em>
                </span>
              </h4>
              <h5 class="colors">
                Type:
                <span>
                  <h4> {cake.type}</h4>
                </span>
              </h5>
              <div class="action">
                <button class="add-to-cart btn btn-default" type="button" onClick={AddtoCart}>
                  add to cart
                </button>
                <button
                  class="like btn btn-default"
                  type="button"
                  style={{ marginLeft: "10px" }}
                >
                  <span class="fa fa-heart"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Cakedetails);
