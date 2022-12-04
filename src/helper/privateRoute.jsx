import React from 'react'
import { Navigate, Route } from 'react-router-dom'


const PrivateRoute = ({element:Element,...rest}) =>{
        return <Route {...rest} component={(props)=>{
            const token = window.localStorage.getItem('userInfo')?.token;
            if(token){
                    return <Element {...props}/>
            }else{
                    return <Navigate to={'/'}/>
            }
        }}/>
}

export default PrivateRoute