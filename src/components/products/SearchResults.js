import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./products.css"

export const SearchResults = ({searchTermsState}) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFiltered] = useState([])
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

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
                return <section className="product">
                    <header>{product.name}</header>
                    <footer>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format((product.price) / 100)}</footer>
                </section>
            }
        )
    }
    </article>
}


