import openSocket from 'socket.io-client'
import {SOCKET_URL} from "./config"

const userInfo = JSON.parse(localStorage.getItem("userInfo"))


const getSocket=()=>{
return(
`${SOCKET_URL}`
)
}


export const socketNode=openSocket(getSocket(),{query:{token:userInfo?.token}},{
    transports:['websocket', 'polling', 'flashsocket']  
});

// export const socketNode=openSocket(getSocket(),{
//     transports:['websocket', 'polling', 'flashsocket']
//     });