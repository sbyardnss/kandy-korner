import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        []
    )
    return (

        <>
            {

                kandyUserObject.staff ?
                    <>
                        <h2>Products</h2>
                        <article className="products">
                            {
                                products.map(
                                    (product) => {
                                        return <section className="product">
                                            <header>{product.name}</header>
                                            <footer>{product.price}</footer>
                                        </section>
                                    }
                                )
                            }</article>
                    </>
                    : <>
                    </>

            }
        </>
    )

}