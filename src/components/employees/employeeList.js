import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Employee } from "./employee"
import "./employees.css"

export const EmployeeList = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users`)
                .then(response => response.json())
                .then(
                    (userArray) => {
                        setUsers(userArray)

                    }
                )
        },
        []
    )
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
    const fireEmployee = (firedEmployeeId) => {
        const firedEmployeeObj = employees.find(employee => employee.id === firedEmployeeId)
        const firedEmployeeUser = users.find(user => user.id === firedEmployeeObj.userId)
        const updateAfterFireToSendToAPI = {
            id: firedEmployeeUser.id,
            name: firedEmployeeUser.name,
            email: firedEmployeeUser.email,
            isStaff: false
        }
        fetch(`http://localhost:8088/employees/${firedEmployeeId}`, {
            method: "DELETE"
        })
            .then(fetch(`http://localhost:8088/employees?_expand=location`)
                .then(response => response.json())
                .then(
                    (employeeArray) => {
                        setEmployees(employeeArray)
                    }
                ))
            .then(() => {
                fetch(`http://localhost:8088/users/${firedEmployeeUser.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updateAfterFireToSendToAPI)
                })
            })
    }

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
                    email={employee.email}
                    fireEmployee={fireEmployee} />)
            }
        </article>

    </>




}