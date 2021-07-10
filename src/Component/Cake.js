import { withRouter } from "react-router-dom"

function Cake(props){
    var showCake = function () {
        var url = "/showcake/" + props.cakeData.cakeid
        props.history.push(url)
        alert(url)
    }
    return(
      // <div class="card" onClick={showCake} style={{ width: "15rem",height:"25rem",  margin:"10px"}}>
      //           <img src={props.cakedata.image} class="card-img-top" style={{ height: "10rem" }} alt="..."></img>
      //           <div class="card-body">
      //               <h5 class="card-title">{props.cakedata.name}</h5>
      //               <p class="card-text">{props.cakedata.price}</p>
      //               <a href="#" class="btn btn-primary">Buy Now</a>
      //               {props.cakedata.discount && <p class="card-text"><b>Disount : </b>{props.cakedata.discount}</p>}
    
    
      //           </div>
      //       </div>
        <div onClick={showCake} class="card" style={{width: "18rem" ,height:"20rem",margin:'20px'}}>
  <img src={props.cakeData.image} style={{height:"90px"}} class="card-img-top" alt="..." ></img>
  <div class="card-body">
    <h5 class="card-title">{props.cakeData.name}</h5>
    <p class="card-text"> {props.cakeData.price} </p>

    {props.cakeData.discount && <p class="card-text"><b>Disount : </b>{props.cakeData.discount}</p>}
    <a href="#" class="btn btn-primary">Buy Now</a>
  </div>
</div>
    )

}

export default withRouter(Cake) 