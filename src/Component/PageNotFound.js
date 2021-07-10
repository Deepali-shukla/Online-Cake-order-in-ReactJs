import { Link } from "react-router-dom";

function PageNotFound(){
    return (
        <div className="row" style={{marginTop:'20px'}}>
            <center>
            <img src="pagenotfound.jpg" style={{height:'400px', width:'800px'}}></img>  
            <br></br>    <br></br>  
          
          
            <Link to="/"> <button className="btn btn-primary">Home</button></Link> </center>
            </div>
            
       
    )
}

export default PageNotFound