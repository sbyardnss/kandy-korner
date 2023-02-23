import { useRef } from "react"
import { useState } from "react"
import "./products.css"
export const ProductSearch = ({setterFunction}) => {
    const [data, setData] = useState(null)
    const [searchTerms, setSearchTerms] = useState(false)
    const getData = (val) => {
        setData(val.target.value)
        
        // console.warn(val.target.value)
    }
    return <div>
        <input id="searchArea" onChange={getData} type="text" placeholder="what candy are you looking for?" />
        <button onClick={(evt) => setterFunction(data)} >search</button>
    </div>
}

