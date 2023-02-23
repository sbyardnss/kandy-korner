import { Link } from "react-router-dom"
export const Employee = ({ id, fullName, email, location, rate, startDate }) => {
    return <section className="employee" key={`employee--${id}`}>
                        <div className="employee__header">
                            <div to={`/employees/${id}`} >Name: {fullName}</div>
                        </div>
                        <div>Store Location: {location}</div>
                        <div>Rate: {rate}/hr</div>
                        <div>Start date: {startDate}</div>
                        <div>Email: {email}</div>
                    </section>

}