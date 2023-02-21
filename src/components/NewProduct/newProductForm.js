import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import * as React from 'react';
import * as ReactDom from 'react-dom';
import "./productForm.css"



//this needs to be reviewed

export const NewProductForm = () => {
    const navigate = useNavigate()
    const [ticket, update] = useState({
        name: "",
        productTypeId: null,
        price: null
    })
    const [types, setTypes] = useState([])

    const submitNewProduct = (event) => {
        event.preventDefault()
        const productToSendToAPI = {
            name: ticket.name,
            productTypeId: ticket.productTypeId,
            price: ticket.price * 100
        }
        return fetch("http://localhost:8088/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
                .then(response => response.json())
                .then((typesArray) => {
                    setTypes(typesArray)
                })
        },
        []
    )

    

    return (
        <form className="productForm">
            <h2 className="ticketForm__title">New Product Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="new product name">new product name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="what is your new candy?"
                        value={ticket.name}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
                <div>
                    <label htmlFor="product type">new product type:</label>
                    {
                        types.map(
                            (type) => {

                                return (
                                    <div id="buttongroup" className="e-btn-group">

                                            <input
                                                required autoFocus
                                                type="radio"
                                                placeholder={type.type}
                                                value={type.id}
                                                onChange= {
                                                    (evt) => {
                                                        const copy = { ...ticket }
                                                        copy.productTypeId = parseInt(evt.target.value)
                                                        update(copy)
                                                    }
                                                } 
                                                
                                                checked={ticket.productTypeId===type.id}
                                                /> {type.type}

                                        <label className="e-btn" htmlFor={`radio--${type.id}`}>
                                        </label>



                                    </div>
                                )

                            }
                        )

                    }
                </div>
                <div className="form-group">
                    <label htmlFor="new product price">new product price:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="what is the price?"
                        value={ticket.price}
                        onChange={
                            (evt) => {
                                const copy = { ...ticket }
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => submitNewProduct(clickEvent)}
                className="btn btn-primary">
                Submit new product
            </button>

        </form>
    )
}