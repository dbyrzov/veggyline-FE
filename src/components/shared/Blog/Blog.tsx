import React, {useContext, useEffect, useState } from 'react';
import styles from './Blog.module.css';
import BlogModel from '../../../models/Blog'
import { httpget } from '../../../services/backend.js'
import SharedContext from '../../../services/context-store';


const Blog: React.FC<any> = (props) => {
  let blogId: string = "";
  const ctx = useContext(SharedContext);
  const [loading, setLoading] = useState(true);
  const [stBlog, setStateBlog] = useState(new BlogModel());

  useEffect( () => {
    let id = new URLSearchParams(props.location.search).get("id");
    if (id != null) {blogId = id;}

    if (blogId.length > 0 && !isNaN(Number(blogId))) {
      httpget('/blog', {id: Number(blogId)})
      .then(res => {
        setStateBlog(res.data);
        setLoading(false);
      })
      .catch(err => {ctx.handleErrors(err);});
    }

  });

  return (<>{
    loading ? 
      null
      :
      <div id={styles.blog}>
        <h1 id={styles.blogTitle}>{stBlog.title}</h1>
        <div id={styles.blogImage} style={{backgroundImage: 'url(' + require('../../../images/' + stBlog.image) + ')'}}>
          
        </div>
        <div id={styles.blogContext} defaultValue={stBlog.content}>{stBlog.content}</div>
      </div>
  }</>)
}

export default Blog;
