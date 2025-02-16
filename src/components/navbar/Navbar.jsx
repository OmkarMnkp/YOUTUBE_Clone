
import react from "react";
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search.png';
import upload from '../../assets/upload.png';
import more from '../../assets/more.png';
import notification from '../../assets/notification.png';
import profile from '../../assets/user_profile.jpg';
import { Link } from "react-router-dom";




const Navbar = ({setSidebar}) => {
    return (
        <nav className="flex-div">

            {/* left */}
            <div className="nav-left flex-div ">
                <img className="menu-icon" src={menu_icon} onClick={()=>prev=>prev===false?true:false} alt="" />
            <Link to={'/'}> <img className="logo" src={logo} alt="" /></Link>   
            </div>

            {/* middle */}
            <div className="nav-middle flex-div " >
                <div className="search-box  flex-div">
                    <input type="text" placeholder="Search" />
                    <img src={searchIcon} alt="" />
                </div>
            </div>

            {/* right */}

            <div className="nav-right felx-div" >
                <img src={upload} alt="" />
                <img src={more} alt="" />
                <img src={notification} alt="" />
                <img className="user-icon" src={profile} alt="" />
            </div>

        </nav>
    )
}

export default Navbar;