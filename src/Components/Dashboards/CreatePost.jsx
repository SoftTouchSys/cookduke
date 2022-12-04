import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Dashboards.css'

import { useTranslation } from 'react-i18next';
import { postCreate } from '../../Actions/userActions';
import { ProgressBar } from 'react-bootstrap';
import { RiImageAddFill, RiVideoAddFill } from 'react-icons/ri';

import EmojiPicker from "emoji-picker-react";

const CreatePost = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()



  const openPost = () => {
    var pop = document.querySelector(".post_popup")
    pop.style.display = "flex"
  }


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const postCreated = useSelector((state) => state.postCreated)
  const msg = postCreated?.message



  const [user, newUser] = useState(userInfo?.user)
  const [newMessage, setMessage] = useState('')
  const [pic, setPic] = useState("")
  const [image, setImage] = useState("")
  const [vid, setVid] = useState("")
  const [video, setVideo] = useState("")
  const [content, setContent] = useState("")
  const [link, setLink] = useState("")

  const [showPicker, setShowPicker] = useState(false);



  const onEmojiClick = (event,emojiObject) => {
    setContent((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };



  useEffect(() => {
  document.addEventListener("click", handleDocumentClick, false);
});
const handleDocumentClick = event => {
    let isEmojiClassFound = false;

    event &&
      event.path &&
      event.path.forEach(elem => {
        if (elem && elem.classList) {
          const data = elem.classList.value;
          if (data.includes("emoji")) {
            isEmojiClassFound = true;
          }
        }
      }); // end
    if ( isEmojiClassFound === false && event.target.id !== "emojis-btn")
        setShowPicker(false);
  };

  useEffect(() => {
    setMessage('')
  }, [])



  useEffect(() => {
    if (msg === "post created successfully") {
      setMessage(msg)
      closePost()
    }

  }, [msg])




  const closePost = () => {
    document.querySelector("#contentFOrm").reset()
    setVid("")
    setPic("")
    setContent("")
    setVideo("")
    setLink("")
    setImage("")
    var pop = document.querySelector(".post_popup")
    pop.style.display = "none"
    setVid("")
    setPic("")
    setContent("")
    setVideo("")
    setLink("")
    setImage("")
    var videoElement = document.querySelector("#viewVideo")
    props.postType === "video" && videoElement.pause();
    props.postType === "video" && videoElement.removeAttribute('src'); // empty source
    props.postType === "video" && videoElement.load();
    //  videoElement?.style?.display="none"

  }

  const handleChangeImage = (e) => {
    setPic(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
  }

  const handleChangeVideo = (e) => {
    if (e.target.files[0].size > 15000000) {
      alert('file too big allowed size 15mb')
    } else {
      setVid(URL.createObjectURL(e.target.files[0]))
      var vidzz = URL.createObjectURL(e.target.files[0])
      document.querySelector("#viewVideo").style.display = 'block';
      var video = document.querySelector("#viewVideo")
      var source = document.createElement('source');
      source.setAttribute('src', vidzz);
      source.setAttribute('type', 'video/mp4');
      video.appendChild(source);
      video.play();

      setVideo(e.target.files[0])
    }

  }

  const [uploadProg, setUploadProg] = useState(0)


  const createPost = () => {
    // console.log('clicked')
    // var valid = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

    // if(postType ==="link" && valid.test(link)){
    // dispatch(postCreate({link,postType }))
    // }else{
    //   alert('youtube link not valid')
    // }
    // console.log(link)

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent
        let percent = Math.floor(loaded * 100 / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)
        if (percent < 100) {
          setUploadProg(percent)
        }
      }
    }
    const postType = props?.postType
    if (content || video || image || link) {

      dispatch(postCreate({ image, content, link, video, postType, options: postType === "video" ? options : {} }))
      setPic('')
      setImage('')
      setContent("")
      setVideo("")
      setLink("")
      uploadProg > 99 && document.querySelector("#contentFOrm").reset()
    } else {
      closePost()
      document.querySelector("#contentFOrm").reset()
    }


  }


  return (
    <div className="menu_container popup_container">
      <span className='cross_menu' onClick={closePost}>x</span>
      <h3>Create Post</h3>
      <form action="" id="contentFOrm">
      <div>
        <textarea
        rows="4"
        id="ContentInp"
        value={content}
        onChange={(e) => { setContent(e.target.value) }}
        placeholder={`What's on your mind, ${userInfo?.user?.firstName} ?`}
        spellcheck="false"
        required></textarea>

        <img
        style={{float:"right",marginTop:"-125px",zIndex:999}}
          className="emoji-icon"
          alt="true"
          id="emojis-btn"
          src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
          onClick={() => setShowPicker((val) => !val)}
        />
        </div>
        {showPicker && (
          <EmojiPicker pickerStyle={{ width: "100%",top:"220px",position:"absolute" }} onEmojiClick={onEmojiClick} />
        )}

        {props?.postType && props?.postType === "video" ?
          <div className="">

            <label for="formFile">

              <video width="450" style={{ display: "none" }} controls id="viewVideo">
                Your browser does not support HTML5 video.
              </video>

              <RiVideoAddFill className='h2 p-0 m-0' />
            </label>
            <input
              className="ppic-input ml-4"
              type="file"
              name="image"
              id="formFile"
              accept="video/mp4"
              onChange={(e) => { handleChangeVideo(e) }}
            />
          </div> : null}
        {props?.postType && props?.postType === "photo" ?
          <div className="image_button">
            <label for="formFile">
              {!pic ? <RiImageAddFill className='h2 p-0 m-0' /> :
                <img className="img" src={pic} alt="not found pic" />
              }
            </label>
            <input
              className="ppic-input ml-4"
              type="file"
              name="image"
              id="formFile"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => { handleChangeImage(e) }}
            />
          </div> : null}
        {props?.postType && props?.postType === "link" ?
          <input type="text" className="mt-2" onChange={(e) => { setLink(e.target.value) }} placeholder="Add video link +" /> : null}

        {uploadProg > 0 && <ProgressBar now={uploadProg} active label={`${uploadProg}%`} />}
        <button type="button" className="button" onClick={createPost}>ADD</button>
      </form>
    </div>
  )
}

export default CreatePost
