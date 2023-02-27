import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./customers.css"


export const CustomerDetails = () => {
    const { customerId } = useParams()
    const [customer, updateCustomer] = useState()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
                .then(response => response.json())
                .then(
                    (data) => {
                        const singleCustomer = data[0]
                        updateCustomer(singleCustomer)
                    }
                )

        },
        [customerId]
    )
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 2500);
        }
    }, [feedback])

    const updateLoyaltyNumber = () => {
        const updatedInfoForAPI = {
            id: customer.id,
            userId: customer.userId,
            loyaltyNumber: parseInt(customer.loyaltyNumber)
        }

        fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedInfoForAPI)
        })
            .then(response => response.json())
            .then(() => {
                setFeedback("Customer Loyalty Number updated")
            })
    }


    return <section className="customer">
        <header>{customer?.user?.name}</header>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <div>Email: {customer?.user?.email}</div>
        {/* <div>LoyaltyNumber: {customer?.loyaltyNumber}</div> */}
        <label htmlFor="loyaltyNumber">Loyalty Number:</label>
        <input
            className="form__input"
            type="text"
            placeholder={customer?.loyaltyNumber}
            value={customer?.loyaltyNumber}
            onChange={
                (evt) => {
                    const customerCopy = { ...customer }
                    customerCopy.loyaltyNumber = evt.target.value
                    updateCustomer(customerCopy)
                }

            }
        ></input>
        <button className="filterButtons" onClick={
            () => {
                updateLoyaltyNumber()
            }
        }>Update</button>
        <footer></footer>
    </section>
}