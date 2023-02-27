import { useState, useEffect, useNavigate } from "react"
import { Purchase } from "./purchase"
import "./purchases.css"



export const Purchases = () => {
    const [customers, setCustomers] = useState([])
    const [customer, setCustomer] = useState({})
    const [products, setProducts] = useState([])
    const [purchases, setPurchases] = useState([])
    // const navigate = useNavigate()

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
            const loggedInCustomer = customers.find(customer => customer.userId === kandyUserObject.id)
            setCustomer(loggedInCustomer)
        },
        [customers]
    )
    useEffect(
        () => {
            fetch(`http://localhost:8088/purchases`)
                .then(response => response.json())
                .then((purchaseArray) => {
                    // const purchaseArray = purchases.filter(purchase => purchase.customerId === customer.id)
                    setPurchases(purchaseArray)
                })
        },
        []
    )
    const userPurchases = purchases.filter(purchase => purchase.customerId === customer?.id)

    return (
        <>
            <article className="purchaseList">
                <ul className="purchases">
                    {
                        purchases.map(
                            (purchase) => {
                                const purchasedProducted = products.find(product => product.id === purchase.productId)
                                return <Purchase key={purchase.id} className="purchase"
                                        id={purchase.id}
                                        productName={purchasedProducted.name}
                                        productPrice={purchasedProducted.price} />
                                
                            }
                        )
                    }
                </ul>


            </article>
        </>
    )
}