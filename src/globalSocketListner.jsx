import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { socketNode } from "./socket"

import { useEffect } from 'react'
import { getNotification } from './Actions/notificationActions'
import audioTone from './audio/pristine-609.mp3' 
import { getConversations, getMessage } from './Actions/messageAction'





const GlobalSocketListner = () => {
const dispatch=useDispatch()
const userLogin = useSelector((state) => state.userLogin)
const { userInfo } = userLogin
const audioRef = useRef();
const socketHandle=()=>{
  
 
  // socketNode.emit("joinUser", userInfo?.user?._id);
 
//   socketNode.on("subscribe", (payload) => {
//     console.log(payload,".........payload.......................................");

//   })

socketNode.on("connect", () => {
    console.log(socketNode.connected); // true
  });
  
  socketNode.on("disconnect", () => {
    console.log(socketNode.connected); // false
    
  });

  socketNode.on("subscribe", (response) => {
    dispatch(getNotification())
  });

  socketNode.on("unsubscribe", (response) => {
    dispatch(getNotification())
  });

  socketNode.on("reaction", (response) => {
    dispatch(getNotification())

  });

  socketNode.on("comment", (response) => {
    dispatch(getNotification())

  });

  socketNode.on("onlineUsers",(response)=>{
    console.log(response)
    dispatch(getNotification())
    dispatch(getConversations())
  })


  // audioRef.current.play();

  socketNode.on('addMessageToClient',(msg)=>{

    socketNode.emit('addMessage',msg);
    dispatch(getMessage(msg.recipient))
    dispatch(getNotification())
    dispatch(getConversations(userInfo?.user?._id))
    

  })
  
  socketNode.on('onlineUsers',(response)=>{
    localStorage.setItem("o",JSON.stringify(response))
})

  window.addEventListener("beforeunload", (ev) => 
{  
  socketNode.emit('disconnect')
    // ev.preventDefault();
    // return ev.returnValue = 'Are you sure you want to close?';
});
  


}


useEffect(()=>{
  socketHandle()
},[])


  return (
    <audio controls ref={audioRef} style={{ display: "none" }}>
        <source src={audioTone} type="audio/mp3" />
      </audio>
  )
}

export default GlobalSocketListner







