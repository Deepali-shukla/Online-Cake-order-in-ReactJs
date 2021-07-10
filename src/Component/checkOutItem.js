import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();


function CheckOutItem(props) {


 

      

    return (
        // <div className="container-fluid">

            <div className="row " style={{marginTop:"20px"}} >

                <div   style={{boxShadow:"2px 2px 2px black"}}>
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
                       
                    </div>
                </div>

                <div class=" col-sm-4">

                </div>



            </div>
            
           
            
        // </div>
        
    );
}

export default withRouter(CheckOutItem);