import axios from "axios"
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


function CartItem(props) {


      var removeCart=()=>
       {
        
       
            var apiurl=`https://apibyashu.herokuapp.com/api/removecakefromcart`
          
            axios({
                method:"post",
                url:apiurl,
                data:{
                   cakeid:props.item.cakeid,
                 },
              headers:{
                     authtoken:localStorage.token
                }
    
             }).then((response)=>{
                 console.log("cake that we search for are",response.data.data)
                 
                 
                    props.removeFromCart(props.key2)
                 
    
             },(error)=>{
                 console.log("error from search api",error)
             })
          
            
        
    
       }

      

    return (
        // <div className="container-fluid">

            <div className="row " style={{marginTop:"8px"}} >

                <div class=" col-sm-6"  style={{boxShadow:"2px 2px 2px red"}}>
                    <div className="row">
                        <div className="col-sm">
                            <img src={props.item.image} class="card-img-top" style={{ height: "3rem", width: "3rem" }} alt="..."></img>
                        </div>
                        <div className="col-sm">
                            <b> {props.item.name}</b>
                        </div>
                        <div className="col-sm">
                            <b> {props.item.price}</b>
                        </div>
                        <div className="col-sm">
                        <button type="button" onClick={removeCart} class="btn btn-danger">Remove</button>
                        </div>
                    </div>
                </div>

                <div class=" col-sm-4">

                </div>



            </div>
            
           
            
        // </div>
        
    );
}

export default withRouter(CartItem);