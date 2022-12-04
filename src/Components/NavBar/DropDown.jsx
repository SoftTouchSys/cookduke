import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from "react-i18next";
import { BiChevronDown } from "react-icons/bi";
import {ListGroup} from 'react-bootstrap';
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import {Link} from "react-router-dom"
import { logout} from "../../Actions/userActions";



const LanguageSelect = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    

    const [user,newUser]=useState(userInfo?.user)
    const [pic,setPic]=useState("https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg")

useEffect(()=>{
    if(userInfo){
        newUser(userInfo?.user)
        setPic(userInfo?.user?.profilePicture===undefined ? "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg":userInfo?.user?.profilePicture)
    }

},[userInfo])


const updateUserProfile = useSelector((state) => state.updateUserProfile)
const { userData } = updateUserProfile
const umessage = userData?.message

useEffect(() => {
    if (umessage === "user updated successfully") {
      setPic(userData?.user?.profilePicture)
    }
  }, [umessage])

    const logOut=()=>{
        dispatch(logout())
    }

    const [menuAnchor, setMenuAnchor] = React.useState(null);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)} className="drop_down">
                <img className="user_img" src={pic} alt="" />
           {user &&  user?.firstName}<BiChevronDown />
            </Button>
            <Popover
                open={!!menuAnchor}
                anchorEl={menuAnchor}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
            >
                <div className="list_menu">
    <ListGroup variant="flush">
      {/* {user && user?.role==="chef"?<ListGroup.Item><Link to="/chef/profile">Profile</Link></ListGroup.Item>:null}
      {user && user?.role==="restaurant"?<ListGroup.Item><Link to="/restaurant/profile">Profile</Link></ListGroup.Item>:null} */}
     <ListGroup.Item><Link to="/profile">Profile</Link></ListGroup.Item>
      <ListGroup.Item><Link to="/">Home</Link></ListGroup.Item>
      {user && user?.role==="chef"?<ListGroup.Item><Link to="/chef/dashboard">Chef Dashboard</Link></ListGroup.Item>:null}
      {user && user?.role==="restaurant"?<ListGroup.Item><Link to="/restaurant/dashboard">Restaurant Dashboard</Link></ListGroup.Item>:null}
      <ListGroup.Item><Link to="/login"><span onClick={logOut}>Logout</span></Link></ListGroup.Item>
    </ListGroup>
                </div>
            </Popover>
        </div>
    );
};

export default LanguageSelect;