import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locations.js"
import { ProductList } from "../products/products.js"
import { NewProductForm } from "../NewProduct/newProductForm.js"
import { NewHireForm } from "../employees/newHireForm.js"
import { EmployeeList } from "../employees/employeeList.js"
import { CustomerList } from "../customers/customerList.js"
import { CustomerDetails } from "../customers/customerDetails.js"


export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div>Get your candy here</div>
					<Outlet />
				</>
			}>
				<Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <ProductList /> } />
				<Route path="products/newProduct" element={ <NewProductForm /> } />
				<Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/newEmployee" element={ <NewHireForm /> } />
				<Route path="customers" element={ <CustomerList /> } />
				<Route path="customers/:customerId" element={ <CustomerDetails /> } />
			</Route>
		</Routes>
	)
}