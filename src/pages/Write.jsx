import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment"
import { AuthContext } from '../context/authContext';

const Write = () => {

  const state = useLocation().state;
  const navigate = useNavigate();

  const { currentUser} = useContext(AuthContext);

  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    }
  }, [currentUser])

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state ? await axios.put(`/posts/${state.id}`, {
        title,
        desc: value,
        cat,
        img: img ? imgUrl : state?.img,
      }) : await axios.post(`/posts/`, {
        title,
        desc: value,
        cat,
        img: img ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      })
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='add'>
      <div className="content">
        <input value={title} type="text" placeholder='title' onChange={(e) => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display: "none"}} type="file" id='file' onChange={(e) => setImg(e.target.files[0])}/>
          <label className='file' htmlFor="file">Upload image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "art"} name="art" id="cat" value="art" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "science"} name="art" id="cat" value="science" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "technology"} name="art" id="cat" value="technology" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "cinema"} name="art" id="cat" value="cinema" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "design"} name="art" id="cat" value="design" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === "food"} name="art" id="cat" value="food" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>          
        </div>
      </div>
    </div>
  )
}

export default Write