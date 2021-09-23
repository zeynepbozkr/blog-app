import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "draft-js/dist/Draft.css";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

function Editor({ setComment }) {
  const handleChange = (e) => {
    setComment(e);
  };

  return (
    <div>
      <SunEditor onChange={handleChange} />
    </div>
  );
}

export default Editor;
