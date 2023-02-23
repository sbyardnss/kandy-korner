import { Link } from "react-router-dom"
export const Customer = ({ id, fullName, email, loyaltyNumber }) => {
    return <section className="customer" key={`customer--${id}`}>
                        <div className="customer__header">
                            <Link to={`/customers/${id}`} >Name: {fullName}</Link>
                        </div>
                        <div>Email: {email}</div>
                    </section>

}