import { useState } from "react"
import { Button } from "react-bootstrap";
import searchIcon from '../icons/search.png'

const Searchbar=({header,onSearch})=>{
    const [logo1,setLogo]=useState(header)
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
      };
    const searchValue=()=>{
        if (searchInput.length>0){
            console.log(searchInput)
            onSearch(searchInput)
        }
        console.log(searchInput)
    }
    return(
        <><div className="search-bar-div">
            <h2 className="logo">{logo1}</h2>
            <input className="searchBox" type="search" placeholder="Search here" onChange={handleChange}  value={searchInput} />
            <Button className="searchIcon" id="searchIconID" onClick={searchValue}>
                <img src={searchIcon} alt="search"/>
            </Button>
        </div>
        </>
    )
}
export default Searchbar