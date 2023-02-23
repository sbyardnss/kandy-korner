import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import "./products.css"

export const SearchResults = ({ searchTermsState }) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFiltered] = useState([])
    const [locationProducts, setLocationProducts] = useState([])
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)


    useEffect(
        () => {
            fetch(`http://localhost:8088/locationProducts?_expand=location`)
                .then(response => response.json())
                .then((lpArray) => {
                    setLocationProducts(lpArray)
                })
        },
        []
    )

    useEffect(
        () => {
            let searchedTerms = products.filter(
                (product) => {
                    return product.name.toLowerCase().includes(searchTermsState?.toLowerCase())
                }
            )
            setFiltered(searchedTerms)
        },
        [searchTermsState]
    )
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






    const alphabeticalProducts = filteredProducts.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)


    return <article>
        {
            alphabeticalProducts.map(
                (product) => {
                    const singleProductLocations = locationProducts.filter(lp => {
                        return product.id === lp.productId
                    })
                    const productLocations = singleProductLocations.map(sPL => {
                        return sPL?.location
                    })

                    return <section className="product">
                        <header>{product.name}</header>
                        <Link onClick={() => {
                            alert(`Available at:
                               ${
                                    productLocations.map(pl => {
                                        return `
${pl.address}`
                                    }).join("")
                                }`

                            )

                        }
                        }>Show me where!</Link>
                        <footer>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format((product.price) / 100)}</footer>
                    </section>
                }
            )
        }
    </article>
}


