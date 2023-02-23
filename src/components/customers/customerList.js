import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Customer } from "./customer"
import "./customers.css"

export const CustomerList = () => {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(response => response.json())
                .then(
                    (customerarray) => {
                        setCustomers(customerarray)

                    }
                )
        },
        []
    )
    // useEffect(
    //     () => {
    //         fetch()
    //     }
    // )

    return <>
        <h2>"Customers"</h2>
        {/* <button className="filterButtons" onClick={() => navigate("/employees/newEmployee")}>New Hire Form</button> */}
        <article className="customers">
            {
                customers.map(customer => <Customer key={`customer--${customer.id}`}
                    id={customer.id}
                    fullName={customer?.user?.name}
                    email={customer?.user?.email} />)
            }
        </article>
    
    </>

    


}