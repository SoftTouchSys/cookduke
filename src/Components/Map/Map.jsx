import React,{useState,useEffect} from 'react'
import './Map.css'
import NavBar from "../NavBar/Navbar"
import { useTranslation } from "react-i18next";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaGlobe } from "react-icons/fa";
import { MdOutlineDirectionsRailway } from "react-icons/md";
import { useSelector } from 'react-redux';
import Leaflet from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import axiosInstance from '../../helper/axios';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { divIcon } from 'leaflet';
import {Link} from 'react-router-dom'



Leaflet.Icon.Default.imagePath =
'../node_modules/leaflet'

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});



const Map = () => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    

    const token = JSON.parse(localStorage.getItem('userInfo'))?.token
    if (!token) {
        window.location = '/';
    }

    
    const [markers,setMarkers]=useState('')

    useEffect(() => {
      axiosInstance.get('/get-map').then((res)=>{
        setMarkers(res.data)
      })
    }, [])
    

    const { t } = useTranslation();

    // const [lat,setLat]=useState('')
    // const [lon,setLon]=useState('')

    
    // useEffect(()=>{
    //  navigator.geolocation.getCurrentPosition(function(position) {
    //   setLat(JSON.stringify(position.coords.latitude));
    //   setLon(JSON.stringify(position.coords.longitude));
    // });
    // },[])


    const position = [31.5925418,74.3048661]
    
    const iconMarkup = renderToStaticMarkup(<FaMapMarkerAlt className='h2 text-success'/>);
    const customMarkerIcon = divIcon({
      html: iconMarkup,
    });
    const [selected,setSelected]=useState([])
    
    // obj?.address[0] !== undefined ?JSON.parse(obj?.address[0]||obj?.address)?.lat:31.5898409,
    // obj?.address[0] !== undefined ?JSON.parse(obj?.address[0]||obj?.address)?.lon:74.2997132
    const chooseAddr=(lat,lon)=>{

    }
    return (
        <>
            <NavBar />
            <div className='map_main'>
                <div className='map_main_leftside'>
                    {/* <div className='map_main_leftside_header'>
                        <BsArrowLeft />
                        <span>Recommended</span>
                        <AiOutlineCaretDown />
                    </div> */}
                    
                    {
                       markers?.length>0?markers?.map((obj,i)=>{
                        return <div className='map_main_leftside_section' key={i}>
                            
                        <div onClick={()=>setSelected([
                            obj?.address[0] !== undefined ?JSON.parse(obj?.address[0]||obj?.address)?.lat:31.5898409,
                            obj?.address[0] !== undefined ?JSON.parse(obj?.address[0]||obj?.address)?.lon:74.2997132
                        ])} className='map_section_info1'>
                            <h6 className="text-capitalize">{obj?.role === "restaurant" ? obj?.restaurantName?obj?.restaurantName: obj?.firstName + ' ' + obj?.lastName : obj?.firstName + ' ' + obj?.lastName}</h6>
                            <p className="text-capitalize">{obj?.address[0] !== undefined ?JSON.parse(obj?.address[0])?.display_name:"no address set"}</p>
                            {/* <p>Open . Closes 2AM</p> */}
                            {/* <p>Dine-In . Takeaway . Delivery</p> */}
                        </div>
                        <div className='map_section_info'>
                            <Link to={`/profile/${obj?._id}`}> <div>
                                <div><FaGlobe /></div>
                                <span>Profile</span>
                            </div></Link>
                            {/* <div>
                                <div><MdOutlineDirectionsRailway /></div>
                                <span>Direction</span>
                            </div> */}
                        </div>
                    </div>
                       }):null
                    }
                    

                </div>
                <div className='map_main_rightside'>
                    <MapContainer 
                    center={selected.lenght>0?selected:position} 
                    zoom={7} 
                    scrollWheelZoom={false}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    style={{ height: '100%', width: '100%' }}

                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {markers?.length>0?markers?.map((obj,i)=>{
                            
                            return <Marker  key={i} position={selected.lenght>0?selected:[
                                obj?.address[0] !== undefined ?JSON.parse(obj?.address[0]||obj?.address)?.lat:31.5898409,
                                obj?.address[0] !== undefined ?JSON.parse(obj?.address[0]||obj?.address)?.lon:74.2997132
                            ]}>
                            <Popup>
                            <b>{obj?.address[0] !== undefined ?obj?.role === "restaurant" ? obj?.restaurantName?obj?.restaurantName: obj?.firstName + ' ' + obj?.lastName : obj?.firstName + ' ' + obj?.lastName:"no address set"}</b>
                                 <br /> {obj?.address[0] !== undefined ?JSON.parse(obj?.address[0])?.display_name:"no address set"}
                            </Popup>
                        </Marker>
                        }):null}
                        
                    </MapContainer>

                </div>
            </div>
        </>
    )
}

export default Map