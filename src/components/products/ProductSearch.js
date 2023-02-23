import { useRef } from "react"
import { useState } from "react"
import "./products.css"
export const ProductSearch = ({ setterFunction }) => {
    const [data, setData] = useState(null)
    const getData = (val) => {
        setData(val.target.value)

        // console.warn(val.target.value)
    }
    return <div>
        <input id="searchArea" onChange={getData} onKeyDown={(e) => {
            if(e.keyCode == 13 && data !== ""){
                setterFunction(data)
            }
        }}type="text" placeholder="what candy are you looking for?" />
        <button onClick={(evt) => {
            if (data !== "") {
                setterFunction(data)
            }

        }
        } >search</button>
    </div>
}

