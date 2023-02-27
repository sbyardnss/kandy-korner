import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    if (kandyUserObject.staff) {
        return (
                    <>
                        <ul className="navbar">
                            <li className="nabar__item navbar">
                                <Link className="navbar__link" to="/locations">Locations</Link>
                            </li>
                            <li className="nabar__item navbar">
                                <Link className="navbar__link" to="/products">Products</Link>
                            </li>
                            <li className="nabar__item navbar">
                                <Link className="navbar__link" to="/employees">Employees</Link>
                            </li>
                            <li className="nabar__item navbar">
                                <Link className="navbar__link" to="/customers">Customers</Link>
                            </li>
                            <li className="navbar__logout">
                                <Link className="navbar__link" to="" onClick={() => {
                                    localStorage.removeItem("kandy_user")
                                    navigate("/", { replace: true })
                                }}>Logout</Link>
                            </li>
                        </ul>
                    </>
                    
        )
    }
    else {
        return (
            <>
                        <ul className="navbar">
                            <li className="nabar__item navbar">
                                <Link className="navbar__link" to="/locations">Locations</Link>
                            </li>
                            <li className="nabar__item navbar">
                                <Link className="navbar__link" to="/products">Products</Link>
                            </li>
                            <li className="nabar__item navbar">
                                <Link className="navbar__link" to="/purchases">My Orders</Link>
                            </li>
                            <li className="navbar__logout">
                                <Link className="navbar__link" to="" onClick={() => {
                                    localStorage.removeItem("kandy_user")
                                    navigate("/", { replace: true })
                                }}>Logout</Link>
                            </li>
                        </ul>
                    </>
        )
    }
}

