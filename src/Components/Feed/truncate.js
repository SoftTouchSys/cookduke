import Linkify from "linkify-react";
import { React, useState } from "react";
import "./feed.css"

export const Truncate = ({ body, id }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div>
      <div className="text" key={id}>
        {readMore ? <Linkify as="p">{body}</Linkify> : <Linkify as="p">{`${body.substring(0, 300)}`}</Linkify>}{" "}
        {body.length > 300 ?<p style={{cursor:"pointer",display:"inline"}}  className="inline shadow-none readmore text-primary" 
        onClick={() => setReadMore(!readMore)}>
          {readMore ? "Show less" : "...Read more"}
        </p>:null}
      </div>
    </div>
  );
};

export default Truncate;