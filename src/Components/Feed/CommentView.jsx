import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./feed.css";
import Comment from "./Comment"
import Skeleton from '@mui/material/Skeleton';



const CommentView = (props) => {
  const [nestedCommentData, setNestedCommentData] = useState("");


  const singlePost = useSelector((state) => state.singlePost);

  useEffect(() => {
    function nest(data, parentId = null) {
      return data?.reduce((r, e) => {
        let obj = Object.assign({}, e);
        if (parentId == e.parentId) {
          let children = nest(data, e._id);
          if (children.length) obj.children = children;
          r.push(obj);
        }
        return r;
      }, []);
    }
    // console.log(singlePost?.post?.comments, "......single post")
    setNestedCommentData(nest(singlePost?.post?.comments));

  }, [singlePost]);


  return (
    <div className="commentView" >
      {/* {console.log(nestedCommentData,"nested....")} */}
      {nestedCommentData && nestedCommentData?.length !== 0 ?
        nestedCommentData?.map((comment, j) => {
          return (
            <Comment
              style={{background:'red'}}
              key={comment?._id}
              comment={comment}
              i={props.i}
              j={j}
              obj={props.obj}
              child={comment?.children?.length}
              parentId={comment?._id}
              page={props.page}
            />
          );
        }) : props.obj.numOfComments === 0 ? "" : <div style={{ marginLeft: "50px" }}>
          <div className="row" >
            <Skeleton sx={{ bgcolor: '#F0F2F5' }} animation="wave" variant="circular" width={45} height={45} style={{ marginTop: 2 }} />
            <Skeleton
              sx={{ bgcolor: '#F0F2F5' }}
              animation="wave"
              height={57}
              width="50%"
              style={{ marginLeft: 6, marginTop: -8 }}
            />
          </div>
          <div className="row" >
            <Skeleton sx={{ bgcolor: '#F0F2F5' }} animation="wave" variant="circular" width={45} height={45} style={{ marginTop: 2 }} />
            <Skeleton
              sx={{ bgcolor: '#F0F2F5' }}
              animation="wave"
              height={57}
              width="60%"
              style={{ marginLeft: 6, marginTop: -8 }}
            />
          </div>
          <div className="row" >
            <Skeleton sx={{ bgcolor: '#F0F2F5' }} animation="wave" variant="circular" width={45} height={45} style={{ marginTop: 2 }} />
            <Skeleton
              sx={{ bgcolor: '#F0F2F5' }}
              animation="wave"
              height={57}
              width="40%"
              style={{ marginLeft: 6, marginTop: -8 }}
            />
          </div>

          {/* <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" /> */}


          {/* <div class="ph-item" style={{border:"none"}}>
          <div class="ph-col-2">
          <div class="ph-row">
            <div class="p-4 ph-avatar">
            </div>
            </div>
        </div>
        <div class="ph-col-8 ml-0">
            <div class="ph-row">
                <div class="ph-col-8 big p-4 ph-border-radius"></div>
                <div class="ph-col-4 empty big"></div>
            </div>
        </div> */}
          {/* -- */}
          {/* <div class="ph-col-2">
          <div class="ph-row">
            <div class="p-4 ph-avatar">
            </div>
            </div>
        </div>
        <div class="ph-col-8">
            <div class="ph-row">
                <div class="ph-col-10 big p-4 ph-border-radius"></div>
                <div class="ph-col-4 empty big"></div>
            </div>
        </div> */}
          {/* --- */}


          {/* </div> */}
        </div>}
    </div>
  );
};

export default CommentView;
