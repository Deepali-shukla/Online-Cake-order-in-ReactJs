import {Link} from "react-router-dom"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
function Navbar(props)
{
    var project_title = "Online Cake Bakery!"
  var logout = function () {
    localStorage.clear()
    window.location.href="/"
  }
  var text=[]
  function getSearchText(event)
  {
    event.preventDefault()
    text= event.target.value
    console.log("Entered text",text)
  }
  function SearchCake(event)
  {
    event.preventDefault()
    console.log("text",text)
    if(text && text.length)
    {
      var url ='/search?q='+text
      alert(url)
      props.history.push(url)
    }
  }
   return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5" style={{boxShadow:"1px 1px 5px gray"}}>
    <div className="container-fluid">
      <Link to="/"  className="navbar-brand"><a  id="projecttitle"><h2><i class="fa fa-birthday-cake" style={{color:"orange",padding:"4px"}}></i>{project_title}</h2></a></Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end  " id="navbarSupportedContent">
     
       
        <form className="d-flex" style={{marginLeft:"140px"}}>
          <input onChange={getSearchText} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
          <Link to="/search"><button onClick={SearchCake} className="btn btn-outline-light" type="submit">Search</button></Link>
          &nbsp;
          <Link to="/signup"><button type="button" style={{width:'90px'}} class="btn btn-light">Sign Up</button></Link>  &nbsp;
    
          {props.isLoggedin &&<div> <Link to="/addcake"><button type="button" class="btn btn-light" style={{width:'90px'}} > Add Cake</button></Link> </div> }  &nbsp;
           {props.isLoggedin &&<div><button type="button" class="btn btn-danger" onClick={logout}>Logout</button></div>}       &nbsp;    
          {!props.isLoggedin &&<Link to="/login"><button type="button" class="btn btn-light">Login</button></Link>}  &nbsp;
          {props.isLoggedin &&<Link to="/cart"><button type="button" class="btn btn-light" style={{width:'90px'}} >My Cart</button></Link>}  &nbsp;
          {props.isLoggedin &&<Link to="/myorder"><button type="button" class="btn btn-light" style={{width:'90px'}} 
          >My Order</button></Link>}
        </form>  &nbsp;
      </div>
    </div>
  </nav>
   )
}
var NavbarComp =withRouter(Navbar)
export default connect(
  function(state) {
    return{
      isLoggedin: state["isloggedin"]
    }
  }
)(NavbarComp)