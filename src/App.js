import './App.css';
import { useSelector } from 'react-redux'
import SignUp from './Components/Forms/SignUp';
import Login from './Components/Forms/Login';
import SetupAccount from './Components/SetupAccount/SetupAccount';
import ForgotPassword from './Components/Forms/ForgotPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GlobalSocketListner from "./globalSocketListner"

import {
  Routes,
  Route,
} from "react-router-dom";

import Feed from './Components/Feed/feed';
import { ValidateEmail } from './Components/Forms/ValidateEmail';
import ResetPassword from './Components/Forms/ResetPassword';
import Profile from './Components/UserProfile/Profile';
import ChefDashboard from './Components/Dashboards/ChefDashboard/ChefDashboard';
import RestaurantDashboard from "./Components/Dashboards/RestaurantDashboard/RestaurantDashboard"
import ChefRestaurantProfile from './Components/ChefRestaurantProfile/ChefRestaurantProfile';
import Chefs from './Components/Chefs/Chefs';
import Restaurants from "./Components/Restaurants/Restaurants"
import Roles from "./Components/Roles/Roles"
import Favourite from './Components/Favourite/Favourite';
import About from "./Components/About/About"
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy"
import RegisteredUsers from "./Components/RegisteredUsers/RegisteredUsers"
import SubscribedUsers from "./Components/SubscribedUsers/SubscribedUsers"
import Orders from "./Components/Orders/Orders"
import TableReservation from "./Components/TableReservation/TableReservation"
import Map from "./Components/Map/Map"
import OrderMeal from "./Components/OrderMeal/OrderMeal"
import AddToCart from "./Components/AddToCart/AddToCart"
import Career from "./Components/Career/Career"
import Messages from "./Components/Messages/Messages"
import Contact from "./Components/Contact/Contact"
import Advertising from "./Components/Advertising/Advertising"
import { NotFound } from './Components/notFound/NotFound';
import SinglePostFeed from './Components/Feed/singlePost';
import UserOrders from './Components/Orders/userOrders';
import Wrapper from "./scrollTransition"
import AdminLogin from './Components/AdminLogin/AdminLogin';

const App = () => {



  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin



  return (
    <div className="App">

      <GlobalSocketListner />

      <GoogleOAuthProvider clientId="438779230494-b1n3ts08qjl5mhiekab1vgg7evevdgnq.apps.googleusercontent.com">
        <Wrapper>
          <Routes>

            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/validate-email" element={<ValidateEmail />}></Route>
            <Route path="/roles" element={<Roles />}></Route>
            <Route exact path="/messages" element={<Messages />}></Route>
            <Route path="/message/:id" element={<Messages />}></Route>
            <Route path="/registeredusers" element={<RegisteredUsers />}></Route>
            <Route path="/subscribedusers" element={<SubscribedUsers />}></Route>
            <Route path="/ordermeal/:id" element={<OrderMeal />}></Route>
            <Route path="/addtocart" element={<AddToCart />}></Route>
            <Route path="/restaurant/orders" element={<Orders />}></Route>
            <Route path="/chef/orders" element={<Orders />}></Route>
            <Route path="/restaurant/orders" element={<Orders />}></Route>
            <Route path="/orders" element={<UserOrders />}></Route>
            <Route path="/tablereservation" element={<TableReservation />}></Route>
            <Route path="/map" element={<Map />}></Route>

            <Route path="/chefs" element={<Chefs />}></Route>
            <Route path="/restaurants" element={<Restaurants />}></Route>
            <Route path="/favourite" element={<Favourite />}></Route>

            <Route path="/about" element={<About />}></Route>
            <Route path="/career" element={<Career />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/advertising" element={<Advertising />}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>

            <Route path='*' element={<NotFound />} />

            <Route path="/" element={userInfo?.user ? <Feed /> : <Login />}></Route>
            {userInfo?.user?.role ? <Route path="/profile" element={<Profile />}></Route> : null}


            <Route path="/:id" element={<SinglePostFeed />}></Route>
            <Route path="/profile/:id" element={<ChefRestaurantProfile />}></Route>

            {userInfo?.user?.role === "chef" ?
              <Route path="/chef/dashboard" element={<ChefDashboard />}></Route>
              :
              null}

            {userInfo?.user?.role === "restaurant" ?
              <Route path="/restaurant/dashboard" element={<RestaurantDashboard />}></Route> :
              null}


            {userInfo?.user?.role === "chef" || userInfo?.user?.role === "restaurant" ?
              <Route exact path="/setup-account" element={<SetupAccount />}></Route>
              :
              null}

              <Route path="/adminlogin" element={<AdminLogin />}></Route>

          </Routes>
        </Wrapper>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
