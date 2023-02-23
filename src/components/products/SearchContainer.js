import { useState } from "react";
import { ProductList } from "./products";
import { ProductSearch } from "./ProductSearch";
import { SearchResults, SearchView } from "./SearchResults";

export const SearchContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    return <>
        <ProductSearch setterFunction={setSearchTerms} /> 
        <SearchResults searchTermsState={searchTerms} />
    </>
}