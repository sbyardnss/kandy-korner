import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./products.css"

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [topPriced, setTopPriced] = useState(false)
    const [filteredProducts, setFiltered] = useState([])
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({})
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
            fetch(`http://localhost:8088/customers`)
                .then(response => response.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
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
            const loggedInCustomer = customers.find(customer => customer.userId === kandyUserObject.id)
            setCustomer(loggedInCustomer)
        },
        [customers]
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

    const purchaseProduct = (id) => {
        const purchaseToSendToAPI = {
            customerId: parseInt(customer?.id),
            productId: parseInt(id),
            quantity: 1
        }
        fetch(`http://localhost:8088/purchases`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(purchaseToSendToAPI)
        })
            .then(res => res.json())

    }

    const alphabeticalProducts = filteredProducts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)
    return (

        <>
            {

                kandyUserObject.staff ?
                    <>
                        <h2>Products</h2>
                        <button className="filterButtons" onClick={() => setTopPriced(true)}>Top Priced</button>
                        <button className="filterButtons" onClick={() => setTopPriced(false)}>All products</button>
                        <button className="filterButtons" onClick={() => navigate("/products/newProduct")}>Create New Product</button>
                        <article className="products">
                            {
                                alphabeticalProducts.map(
                                    (product) => {
                                        return <section className="product">
                                            <header>{product.name} - {product?.productType.type}</header>
                                            <footer>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format((product.price) / 100)}</footer>
                                        </section>
                                    }
                                )
                            }</article>
                    </>
                    : <>
                        <h2>Products</h2>
                        <button className="filterButtons" onClick={() => navigate("/products/search")}>Search products</button>
                        <article className="products">
                            {
                                alphabeticalProducts.map(
                                    (product) => {
                                        return <section key={product.id} className="product">
                                            <header>{product.name} - {product?.productType.type}</header>
                                            <footer className="productFooter">{Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format((product.price) / 100)}
                                                <button className="purchaseButton" onClick={
                                                    () => {
                                                        purchaseProduct(product?.id)

                                                    }
                                                }>Purchase</button></footer>
                                        </section>
                                    }
                                )
                            }</article>
                    </>

            }
        </>
    )

}

