import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [topPriced, setTopPriced] = useState(false)
    const [filteredProducts, setFiltered] = useState([])
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=productType`)
                .then(response => response.json())
                .then((productArray) => {
                    setProducts(productArray)
                })
        },
        []
    )


    
    useEffect(
        () => {
           
            setFiltered(products)
        },
        [products]
    )
    useEffect(
        () => {
            if (topPriced) {
                const expensiveProducts = products.filter(p => p.price >= 200)
                setFiltered(expensiveProducts)
            } 
            else {
                setFiltered(products)
            }
        },
        [topPriced]
    )
    
        
    const alphabeticalProducts = filteredProducts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    return (

        <>
            {

                kandyUserObject.staff ?
                    <>
                        <h2>Products</h2>
                        <button className="filterButtons" onClick={() => setTopPriced(true) }>Top Priced</button>
                        <button className="filterButtons" onClick={() => setTopPriced(false) }>All products</button>
                        <button className="filterButtons" onClick={() => navigate("/products/newProduct")}>Create New Product</button>
                        <article className="products">
                            {
                                alphabeticalProducts.map(
                                    (product) => {
                                        return <section className="product">
                                            <header>{product.name} - {product?.productType.type}</header>
                                            <footer>{Intl.NumberFormat('en-US', {style: 'currency', currency: 'usd'}).format((product.price) / 100)}</footer>
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

