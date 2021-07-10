import axios from "axios"
import { useState } from "react"
import Cake from "./Cake"
import data from "./data"
function CakeList(){
    var [cakes,setCakes] = useState(data.cakes)
    if(!cakes.length>0)
    {
        axios({
            url: "https://apibyashu.herokuapp.com/api/allcakes",
            method: "get",
    
         }).then((response) => {
            console.log("response from allcake api", response.data)
                data.cakes=response.data.data
                setCakes(response.data.data)
         }, (error) => {
             console.log("error from allcake api", error)
         })
    }
    return(
     
       <div className="row">
         <div className="row">
        {/* {this.state.cakes.map(function (each) {
          return <Cake cakeData={each} />
        })}  */}
        {cakes && cakes.length>0 && cakes.map((each,index)=>{
            return<Cake key={index} cakeData={each}/>
        })}
      </div>
    </div>
    )
}
export default CakeList