import { useState } from "react"
import { Button, NavLink } from "react-bootstrap";
import searchIcon from '../icons/search.png'
import openIcon from '../icons/open.svg'

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
    const handleKey=(e)=>{
        console.log(searchInput)
        if(e.key==='Enter'){
            console.log(searchInput)
            searchValue()
        }
    }

    return(
        <><div className="search-bar-div">
            <NavLink className='open-icon-div'>
                <img className='open-icon-SB' src={openIcon} alt="Icon"></img>
            </NavLink>
            <h3 className="logo">{logo1}</h3>
            <input className="searchBox" type="search" id="searchB" placeholder="Search here" onKeyDown={handleKey} onChange={handleChange}  value={searchInput} />
            <Button className="searchIcon" id="searchIconID" onClick={searchValue}>
                <img className="searchImg" src={searchIcon} alt="search"/>
            </Button>
            <i className="fas fa-cog"></i> 
        </div>
        
        </>
        
    )
}
export default Searchbar