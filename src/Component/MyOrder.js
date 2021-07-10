import CartItem from "./CartItem";

import axios from "axios"
import { useState } from 'react';
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import CheckOutItem from "./checkOutItem";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function MyOrder(props) {

    var [cakesresult, setCakesresult] = useState([])



    useEffect(function () {

        var apiurl = `https://apibyashu.herokuapp.com/api/cakeorders`

        axios({
            method: "post",
            url: apiurl,
            data: {
                email: localStorage.email
            },
            headers: {
                authtoken: localStorage.token
            }

        }).then((response) => {
            console.log("My order", response.data)
            setCakesresult(response.data.cakeorders)

        }, (error) => {
            console.log("error from search api", error)
        })


    }, [])

    return (
            
         <div>

            <div >
                {cakesresult.map((e, index) => {

                    var idd=`rr${e.orderid}`
                    var iddd=`#rr${e.orderid}`

                    return (<div class="container" data-bs-toggle="collapse" data-bs-target={iddd} style={{
                        textAlign: "left",
                        marginTop: "6%",
                        width: "70%",
                        borderRadius: "10px",

                        backgroundColor: "rgba(60,80,220,0.1)",
                        boxShadow: "1px 1px 10px gray",
                    }}>
                         
                       
                         
                         <div class="row "   >
                                  <h3>Order Id : {e.orderid}</h3>
                         </div>
                         
                         

                        <div class="row collapse" id={idd} >

                            <div class="col-sm-6" >


                                <div class="row" style={{paddingTop:"20px"}}>
                                    <div class="col-sm-6">
                                        <b>Order Amount</b>
                                    </div>
                                    <div class="col-sm-6">
                                        <b>{e.price}</b>
                                    </div>
                                </div> <br></br>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <b>City</b>
                                    </div>
                                    <div class="col-sm-6">
                                        <b>{e.city}</b>
                                    </div>
                                </div><br></br>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <b>Pincode</b>
                                    </div>
                                    <div class="col-sm-6">
                                        <b>{e.pincode}</b>
                                    </div>
                                </div><br></br>

                                <div class="row">
                                    <div class="col-sm-6">
                                        <b>Phone</b>
                                    </div>
                                    <div class="col-sm-6">
                                        <b>{e.phone}</b>
                                    </div>
                                </div><br></br>

                                
                                <div class="row">
                                    <div class="col-sm-6">
                                        <b>Order Placed On</b>
                                    </div>
                                    <div class="col-sm-6">
                                        <b>{e.orderdate}</b>
                                    </div>
                                </div><br></br>

                            </div>
                            <div class="col-sm-6">

                                <div class="row" style={{width:"50rem"}}>



                                    {(e.cakes).length > 0 && <div >
                                        {
                                            (e.cakes).map((e, index) => {

                                                return <CheckOutItem item={e}  ></CheckOutItem>
                                            })}

                                    </div>}

                                </div><br></br>
                            </div>

                        </div>

                    </div>
                    )

                })}

            </div>

        </div>

    
    )
}


export default MyOrder;