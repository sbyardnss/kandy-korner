import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locations.js"
import { ProductList } from "../products/products.js"
import { NewProductForm } from "../NewProduct/newProductForm.js"


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
			</Route>
		</Routes>
	)
}