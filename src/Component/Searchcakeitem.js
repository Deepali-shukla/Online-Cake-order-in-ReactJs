
function Searchcakeitem(props) {
    return(
        <div className="row">
      <div className="col-4">
          <img src={props.searchcakedata.image} className="card-img-top"  style={{height:"10rem",width:"10rem"}}  alt="..."></img>
           </div> 
           <div className="col-4">
               <ul style={{listStyleType:"none"}}>
                   <li><b>Cake Name:</b>{props.searchcakedata.name}</li>
                   <li><b>Cake Weight:</b>{props.searchcakedata.weight}</li>
                   <li><b>Cake flavour:</b>{props.searchcakedata.flavour}</li>
                   <li><b>Cake type:</b>  {props.searchcakedata.type}</li>
                   <li>{props.searchcakedata.egg && <p>Contains Egg</p>}</li>
                   <li>{!props.searchcakedata.egg && <p>Eggless</p>}</li>
               </ul>
           </div> 
           <div class="col-2">
                   <h2>Price: {props.searchcakedata.price}</h2>
               </div>
           <div class="col-2">
                   {/* <button type="button" class="btn btn-default" style={{color:"white",backgroundColor:"blue"}}>Add to Cart</button> */}
               </div>
        </div>
    )  
}
export default Searchcakeitem;
