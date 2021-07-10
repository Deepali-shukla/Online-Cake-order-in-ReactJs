import CartItem from "./CartItem";
import axios from "axios"
import { useState } from 'react';
import {useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function CartList(props)
{

    var [cakesresult, setCakesresult]=useState([])
    var total=0;
    var items=0;  


    function removeFromCart(index)
    {
        //  alert("delete ka krte h kuch na kuch")
         cakesresult.splice(index,1)
         var temp=[...cakesresult]
         setCakesresult(temp)
         toast.success("succesfully removed")
         
    }
     var checkout = ()=>
    {
       alert("You are in checkout page")
       var url="/checkout"
       var data = {
            price:total,
            item:items,
            cakes:cakesresult
       }
       props.history.push(url,data)
    }


    useEffect(function(){
       
        var apiurl=`https://apibyashu.herokuapp.com/api/cakecart`
      
        axios({
            method:"post",
            url:apiurl,
            data:{
                email:localStorage.email
            },
            headers:{
                authtoken:localStorage.token
            }

        }).then((response)=>{
            console.log("cake that we search for are",response.data.data)
            setCakesresult(response.data.data)

        },(error)=>{
            console.log("error from search api",error)
        })

        
    },[])

    return (

        <div  >
             {cakesresult.length==0 && <div class="alert alert-warning"><h1>
                           Your cart is Empty
                  </h1></div>
             }

               { cakesresult.length>0 &&  <div >
                                          { 
                                             cakesresult.map((e,index)=> {
                                             total+=e.price
                                             items++
                                             return <CartItem item={e} key2={index} removeFromCart={removeFromCart} ></CartItem>
                                          })   }

           </div> }
          { cakesresult.length!=0 &&
          <div   style={{float:"right"}}>
                     <span> <button style={{marginTop:"15px"}} type="button" class="btn btn-info">Total Price : {total} total items:{items}</button> </span>
                        <button type="button" onClick={checkout} class="btn btn-success">CheckOut</button> 
          </div> }
          
        </div>
        
       
        
    );
}


export default  CartList;