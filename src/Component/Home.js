import React, { Component } from "react"
import Carousel from "./Carousel"
import CakeList from "./CakeList"

class Home extends Component
{
    render(){
        return(
            <div>
                    <Carousel></Carousel>
                    <CakeList></CakeList>
            </div>
        )
    }
}
export default Home