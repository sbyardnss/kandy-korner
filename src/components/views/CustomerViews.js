import { NavBar } from "../nav/NavBar.js"
import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/locations.js"
import { ProductList } from "../products/products.js"
import { ProductSearch } from "../products/ProductSearch.js"
import { SearchContainer } from "../products/SearchContainer.js"
import { SearchResults, SearchView } from "../products/SearchResults.js"


export const CustomerViews = () => {
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
                <Route path="products/search" element={ <SearchContainer /> } />

			</Route>
		</Routes>
	)
}