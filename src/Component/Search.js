import axios from "axios"
import { useEffect, useState } from "react"
import queryparser from "query-string"
import Searchcakeitem from "./Searchcakeitem"
function Search(props){
    var query= queryparser.parse(props.location.search)
    console.log("Query what we have searched for",query)
    var searchtext = query.q
    var[cakesresult,setCakesresult]=useState([])
    useEffect(function(){
        console.log("it will run only once")
        var apiurl ="https://apibyashu.herokuapp.com/api/searchcakes?q="+searchtext;
        axios({
            method:"get",
            url: apiurl
        }).then((response)=>{
            console.log("cakes that we searched for are",response.data.data)
            setCakesresult(response.data.data)
        },(error)=>{
            console.log("error from search api",error)
        })
    },[searchtext])
    return(
        <div>
            {!cakesresult.length>0 && <div class="alert-alert-warning"><h1>Oops! No cakes found for your search</h1></div>}
            {cakesresult.length>0 && <div><h3>Results found</h3>
            {
                cakesresult.map((each)=>{
                    return <Searchcakeitem searchcakedata={each}/>
                })
            }</div>}
        </div>
    )
}
export default Search