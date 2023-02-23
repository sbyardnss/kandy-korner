import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "./employee"
import "./employees.css"

export const EmployeeList = () => {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=location`)
                .then(response => response.json())
                .then(
                    (employeeArray) => {
                        setEmployees(employeeArray)

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
        <h2>"Employees"</h2>
        <button className="filterButtons" onClick={() => navigate("/employees/newEmployee")}>New Hire Form</button>
        <article className="employees">
            {
                employees.map(employee => <Employee key={`employee--${employee.id}`}
                    id={employee.id}
                    fullName={employee.name}
                    location={employee?.location?.address}
                    startDate={employee.startDate}
                    rate={Intl.NumberFormat('en-US', { style: 'currency', currency: 'usd' }).format((employee.payRatePerHour))}
                    email={employee.email} />)
            }
        </article>
    
    </>

    


}