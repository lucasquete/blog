import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../urls';

const Menu = ({cat, id}) => {

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}posts/recon?cat=${cat}&id=${id}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [cat]);

  return (
    <div className='menu'>
        <h1>Other post you may like</h1>
        {posts.map((post) => (
            <div className="post" key={post.id}>
                <img src={`../uploads/${post.img}`} alt="" />
                <h2>{post.title}</h2>
                <button>Read more</button>
            </div>
        ))}
    </div>
  )
}

export default Menu