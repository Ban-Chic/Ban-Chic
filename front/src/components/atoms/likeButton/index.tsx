import React, { useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

function LikeButton() {
  const [isLike, setIsLike] = useState(false);
  return (
    <>
      <div>
        {isLike ? (
          <HeartFilled style={{ color: "red", fontSize: "30px" }} />
        ) : (
          <HeartOutlined style={{ color: "white", fontSize: "30px" }} />
        )}
        <HeartOutlined style={{ color: "white", fontSize: "30px" }} />
        <h3>좋아요 횟수</h3>
      </div>
    </>
  );
}

export default LikeButton;
