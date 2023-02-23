import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import "./employees.css"

export const NewHireForm = () => {
    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    const [users, setUsers] = useState([])
    const [locations, setLocations] = useState([])
    const [newUser, updateUser] = useState({
        name: "",
        email: null,
    })
    const [newHire, updateHire] = useState({
        name: "",
        rate: null,
        email: null,
        locationId: null,
        firstDay: null,
        payRatePerHour: null

    })
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
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then(
                    (locationsArray) => {
                        setLocations(locationsArray)

                    }
                )
        },
        []
    )
    const submitNewHire = (event) => {
        event.preventDefault()

        const userToSendToAPI = {
            name: newUser.name,
            email: newUser.email,
            isStaff: true
        }
        const employeeToSendToAPI = {
            name: newHire.name,
            userId: (users.length + 1),
            email: newHire.email,
            locationId: parseInt(newHire.locationId),
            startDate: newHire.firstDay,
            payRatePerHour: parseFloat(newHire.payRatePerHour)
        }
        return fetch("http://localhost:8088/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify(employeeToSendToAPI)
        })
            .then(response => response.json())
            .then(fetch("http://localhost:8088/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userToSendToAPI)
            })
                .then(response => response.json()))
            .then(() => {
                navigate("/employees")
            })
    }
    return (
        <>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="new hire name">new hire name</label>
                    <input
                        type="text"
                        placeholder="new hire name"
                        onChange={
                            (evt) => {
                                const userCopy = { ...newUser }
                                const hireCopy = { ...newHire }
                                userCopy.name = evt.target.value
                                hireCopy.name = evt.target.value
                                updateHire(hireCopy)
                                updateUser(userCopy)
                            }
                        }
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="new hire email">email</label>
                    <input
                        type="text"
                        placeholder="new hire email"
                        onChange={
                            (evt) => {
                                const userCopy = { ...newUser }
                                const hireCopy = { ...newHire }
                                userCopy.email = evt.target.value
                                hireCopy.email = evt.target.value
                                updateHire(hireCopy)
                                updateUser(userCopy)
                            }

                        }
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="new hire rate">rate</label>
                    <input
                        type="text"
                        placeholder="new hire rate"
                        onChange={
                            (evt) => {
                                const hireCopy = { ...newHire }
                                hireCopy.payRatePerHour = evt.target.value
                                updateHire(hireCopy)
                            }

                        }
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="start date">start date</label>
                    <input
                        type="date"
                        placeholder="start date"
                        onChange={
                            (evt) => {
                                const hireCopy = { ...newHire }
                                hireCopy.firstDay = evt.target.value
                                updateHire(hireCopy)
                            }

                        }
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="location">store location</label>
                    <select
                        placeholder="store location"
                        onChange={
                            (evt) => {
                                const hireCopy = { ...newHire }
                                hireCopy.locationId = evt.target.value
                                updateHire(hireCopy)
                            }

                        }
                    >
                        <option value="0">select location</option>
                        {
                            locations.map(l => {
                                return <option value={l.id} >{l.address}</option>
                            })
                        }
                    </select>
                </div>

            </fieldset>
            <button
                onClick={(clickEvent) => submitNewHire(clickEvent)}
                className="btn btn-primary">
                Submit new hire
            </button>
        </>
    )

}