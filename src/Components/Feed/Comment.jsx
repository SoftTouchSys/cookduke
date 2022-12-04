import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./feed.css";

import { HiReply } from "react-icons/hi";
import { AiOutlineComment } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { CgMoreVertical } from "react-icons/cg";


import { Mention, MentionsInput } from "react-mentions";
import defaultStyle from "./defaultStyle";
import moment from "moment";
import { socketNode } from "../../socket";
import { getSinglePost, getSubscribingPost } from "../../Actions/postActions";
import axiosInstance from "../../helper/axios";
import axios from "axios";

const neverMatchingRegex = /($a)/

function Comment({ comment, i, j, obj, child, parentId, type, page }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();


  const [emojis, setEmojis] = useState([])

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const [addReply, setAddReply] = useState("");
  const [editReply, setEditReply] = useState("");
  const [updatedComment,setUpdatedComment]=useState('');


  // console.log(editReply, updatedComment)
  const [commentEdit, setCommentEdit] = useState(false)

// useEffect(()=>{
//   if (editReply.comment.includes("@")) {
//     setEditReply("@")
//     var addReply2;
//     if (comment?.user && comment?.user?.role === "restaurant") {
//       addReply2 = "@[" + comment?.user?.restaurantName + "](" + comment?.user?.restaurantName + ")" + " " + addReply

//     } else {
//       addReply2 = "@[" + comment?.user?.firstName + " " + comment?.user?.lastName + "](" + comment?.user?.firstName + " " + comment?.user?.lastName + ")" + " " + addReply
//     }

//   } else {
//     setEditReply([...setEditReply, editReply.comment]) 
//   }
// },[editReply])

  const submitReply = (e, userId, postId, commentId, user) => {
    if (!addReply.includes("@")) {
      var addReply2;
      if (comment?.user && comment?.user?.role === "restaurant") {
        addReply2 = "@[" + comment?.user?.restaurantName + "](" + comment?.user?.restaurantName + ")" + " " + addReply

      } else {
        addReply2 = "@[" + comment?.user?.firstName + " " + comment?.user?.lastName + "](" + comment?.user?.firstName + " " + comment?.user?.lastName + ")" + " " + addReply
      }

    } else {
      addReply2 = addReply
    }


    e.preventDefault();

    if (addReply) {
      socketNode.emit("replyComment", {
        userId: userId,
        postId: postId,
        commentId: commentId,
        comment: addReply2,
        parentId: parentId,
      });

      // console.log(addReply2, "reply")

      socketNode.on("comment", (response) => { });
      // document.querySelector("#comm_input").value = "";
      dispatch(getSubscribingPost(Number(page)));
      dispatch(getSinglePost(postId));
    }

  };

  useEffect(() => {

    fetch(
      'https://gist.githubusercontent.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb/raw/d8e4b78cfe66862cf3809443c1dba017f37b61db/emojis.json'
      // 'https://raw.githubusercontent.com/github/gemoji/master/db/emoji.json'
    ).then((response) => {
      // console.log(response)
      return response.json()
    })
      .then((jsonData) => {
        setEmojis(jsonData.emojis)
      })



  }, [])

  const updateComment=(e)=>{
    e.preventDefault();

    axiosInstance.put('/updateComment',{id:editReply?._id, comment:updatedComment}).then((resp)=>{
      dispatch(getSinglePost(editReply?.post));
      setCommentEdit(false);
      setEditReply('');
      setUpdatedComment('')
    })
    
  }
  const handleReply = (e, i, j, k) => {
    if (
      document
        .querySelector(`.feed_banner_left_search_rply_${i}_${j}_${k}`)
        .classList.contains("d-none")
    ) {
      var btn = document.querySelectorAll(`.feed_banner_left_search_rply`);
      for (let i = 0; i < btn.length; i++) {
        btn[i].classList.add("d-none");
      }
      document
        .querySelector(`.feed_banner_left_search_rply_${i}_${j}_${k}`)
        .classList.remove("d-none");
    } else {
      var btn = document.querySelectorAll(`.feed_banner_left_search_rply`);
      for (let i = 0; i < btn.length; i++) {
        btn[i].classList.add("d-none");
      }
      document
        .querySelector(`.feed_banner_left_search_rply_${i}_${j}_${k}`)
        .classList.add("d-none");
    }
  };
  const openReply = () => {

  }

  const openBox = (i, j) => {
    if (
      document
        .querySelector(`.edit_delete_box_${i}_${j}_${comment?._id}`)
        .classList.contains("d-none")
    ) {
      var btn = document.querySelectorAll(`.edit_delete_box`);
      for (let i = 0; i < btn.length; i++) {
        btn[i].classList.add("d-none");
      }
      document
        .querySelector(`.edit_delete_box_${i}_${j}_${comment?._id}`)
        .classList.remove("d-none");
    } else {
      var btn = document.querySelectorAll(`.edit_delete_box`);
      for (let i = 0; i < btn.length; i++) {
        btn[i].classList.add("d-none");
      }
      document
        .querySelector(`.edit_delete_box_${i}_${j}_${comment?._id}`)
        .classList.add("d-none");
    }

  }

  const singlePost = useSelector((state) => state.singlePost)

  const deleteComment = (e, id, pId) => {

    var replys = [...singlePost?.post?.comments?.filter(
      obj => obj.parentId === id
    ), comment]

    // console.log(replys, "replys")


    var ids = replys.map((obj) => {
      return obj._id
    })
    console.log(ids, ".....ids")
    axiosInstance.post("/deleteComment", { id: ids })

    dispatch(getSubscribingPost(Number(page)))
    dispatch(getSinglePost(pId))

  }

  const queryEmojis = (query, callback) => {
    if (query.length === 0) return

    const matches = emojis
      .filter((emoji) => {
        return emoji.name.indexOf(query.toLowerCase()) > -1
      })
      .slice(0, 10)
    return matches.map(({ emoji }) => ({ id: emoji }))
  }

  const nestedComments = comment && comment?.children?.map((comment) => {
    // console.log(comment,"....nested2")
    return (
      <Comment
        key={comment?._id}
        comment={comment}
        i={i}
        j={j}
        obj={obj}
        child={comment?.children?.length}
        type="child"
        parentId={parentId}
      />
    );
  }).reverse();

  return (
    <div className="ml-4">
      <div className="media d-flex flex-column">
        <div className="d-flex">
          <div className="media-left feed_banner_left_search_image">
            <img
              src={
                comment?.user?.profilePicture ||
                "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg"
              }
              alt="user image"
            />
          </div>
          <div className="media-body ">
            {commentEdit?<form
            className="comment-form"
            onSubmit={updateComment}
          >

            <input className="ml-2 form-control" type="text" defaultValue={editReply && editReply?.comment?.split(")").pop()} onChange={(e) => setUpdatedComment(e.target.value)}/>
            {/* <button type="submit">Reply</button> */}
          </form>:
              <div className="combox">
              <Link to={`/profile/${comment?.user?._id}`}>
                <h4 className="media-heading title">
                  {comment?.user && comment?.user?.role === "restaurant"
                    ? comment?.user?.restaurantName
                    : comment?.user?.firstName + " " + comment?.user?.lastName}
                </h4>
              </Link>
              {/* <p className="komen">{comment?.comment}</p> */}
              <p className="komen">
                <b> {comment?.comment?.substring(
                  comment?.comment?.indexOf("[") + 1,
                  comment?.comment?.lastIndexOf("]")
                ) ? ("@" + comment?.comment?.substring(
                  comment?.comment?.indexOf("[") + 1,
                  comment?.comment?.lastIndexOf("]")
                )) : ""}</b>

                <span>
                  {comment?.comment?.substring(
                    comment?.comment?.indexOf(")") + 1
                  )}
                </span>

              </p>

            </div>}
            <div style={{ cursor: "pointer" }} className="reply-text">
              <span
                className=""
                onClick={(e) => handleReply(e, i, j, comment?._id)}
              >
                <AiOutlineComment style={{ color: "green" }} />
                <span className="ml-1"> {t("Reply")}</span>
              </span>
              {type == "child" ? null : <span
                className="comreply"
                onClick={(e) => openReply(e, i, j, comment?._id)}
              >
                <HiReply style={{ color: "green", transform: "rotate(-180deg)" }} />
                <span className="ml-1">

                  {child == undefined ? "0" : child} {child > 1 ? t("Replies") : t("Reply")}
                </span>
              </span>}
              <span className="comdate">
                <IoMdTime style={{ color: "green" }} /> {moment(comment?.createdAt).fromNow()}
              </span>
            </div>
          </div>

          {comment?.user?._id === userInfo?.user?._id || obj?.author?._id === userInfo?.user?._id ?
            <span className={!commentEdit?"edit_delete_icon":"comment_edit_delete"} onClick={() => { openBox(i, j, comment?._id) }}><CgMoreVertical />
              <div className={`edit_delete_box d-none edit_delete_box_${i}_${j}_${comment?._id}`}>
                {comment?.user?._id === userInfo?.user?._id ? <small onClick={() => {setEditReply(comment);setCommentEdit(!commentEdit)}}>Edit</small> :
                  obj?.author[0]?._id === userInfo?.user?._id ? null : <small onClick={() => {setEditReply(comment);setCommentEdit(!commentEdit)}}>Edit</small>}
                <small onClick={(e) => { deleteComment(e, comment?._id, obj?._id) }}>Delete</small>
              </div>
            </span> : null}
        </div>
        {/* ----- */}
        <div
          className={`feed_banner_left_search_rply d-none feed_banner_left_search_rply_${i}_${j}_${comment?._id}`}
        >
          <div className="media-left feed_banner_left_search_image">
            <img
              src={
                userInfo?.user?.profilePicture ||
                "https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg"
              }
              alt="user image"
            />
          </div>
          <form
            className="comment-form"
            onSubmit={(e) => submitReply(e, comment?.user?._id, obj?._id, comment?._id, comment?.user)}
          >
            <MentionsInput
              style={defaultStyle}
              value={addReply}
              singleLine="true"
              onChange={(e) => setAddReply(e.target.value)}
              placeholder="use':' for emoji eg ':smile' @ for mention"
            >
              <Mention
                style={{ background: "#F0F2F5" }}
                data={[
                  {
                    id:
                      comment?.user && comment?.user?.role === "restaurant"
                        ? comment?.user?.restaurantName
                        : comment?.user?.firstName +
                        " " +
                        comment?.user?.lastName,
                    display:
                      comment?.user && comment?.user?.role === "restaurant"
                        ? comment?.user?.restaurantName
                        : comment?.user?.firstName +
                        " " +
                        comment?.user?.lastName,
                  },
                ]}
              />
              <Mention
                trigger=":"
                markup="__id__"
                regex={neverMatchingRegex}
                data={queryEmojis}
              />
            </MentionsInput>
            {/* <button type="submit">Reply</button> */}
          </form>
        </div>
      </div>
      {nestedComments}
    </div>
  );
}
export default Comment;