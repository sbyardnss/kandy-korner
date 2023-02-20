import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [topPriced, setTopPriced] = useState(false)
    const [filteredProducts, setFiltered] = useState([])
    

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
    
    useEffect(
        () => {
            if (topPriced) {
                const expensiveProducts = products.filter(p => p.price >= 2)
                setFiltered(expensiveProducts)
            } 
            else {
                setFiltered(products)
            }
        },
        [topPriced]
    )
    
    useEffect(
        () => {
           
            setFiltered(products)
        },
        [products]
    )
        
    const alphabeticalProducts = filteredProducts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    return (

        <>
            {

                kandyUserObject.staff ?
                    <>
                        <h2>Products</h2>
                        <button onClick={() => setTopPriced(true) }>Top Priced</button>
                        <article className="products">
                            {
                                alphabeticalProducts.map(
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