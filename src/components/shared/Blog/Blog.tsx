import React, {useContext, useEffect, useState } from 'react';
import styles from './Blog.module.css';
import BlogModel from '../../../models/Blog'
import { httpget } from '../../../services/backend.js'
import SharedContext from '../../../services/context-store';
import {FacebookShareCount} from "react-share";
import {FacebookIcon} from "react-share";


const Blog: React.FC<any> = (props) => {
  let blogId: string = "";
  const ctx = useContext(SharedContext);
  const [loading, setLoading] = useState(true);
  const [stBlog, setStateBlog] = useState(new BlogModel());

  let imageUrl = 'url("https://veggyline.com/images/';
  if (stBlog.image && stBlog.image.length > 0) {
    imageUrl += stBlog.image + '"';
  } else {
    imageUrl += 'no_image.png")';
  }

  // https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flocalhost%3A3000%2Fblogs%2Fblog%3Fid%3D112&amp;src=sdkpreparse"

  useEffect( () => {
    let id = new URLSearchParams(props.location.search).get("id");
    if (id != null) {blogId = id;}

    if (blogId.length > 0 && !isNaN(Number(blogId))) {
      httpget('/blog', {id: Number(blogId)})
      .then(res => {
        let slog = new BlogModel();
        slog = res.data;
        slog.content.replace(/\n/, '<br/>');
        setStateBlog(slog);
        setLoading(false);
      })
      .catch(err => {ctx.handleErrors(err);});
    }

  }, []);

  return (<>
    {
      loading ? 
        null
        :
        <div id={styles.blog}>
          <h1 id={styles.blogTitle}>
            <span>{stBlog.title}</span>
            <div title="Share blog to facebook">
              <FacebookIcon size={40} round={true} onClick={() => shareFacebook()} />
            </div>
          </h1>
          
          <div id={styles.blogImageContainer}>
            <div id={styles.blogImage} style={{backgroundImage: imageUrl}}></div>
          </div>
          <pre id={styles.blogContext} defaultValue={stBlog.content}>{stBlog.content}</pre>
          {/* <div className={styles.scrollDown} onClick={(e) => gotoBottom(e.target)}>&#x022C1;</div> */}
          {/* <div className={styles.scrollDown} onClick={(e) => gotoBottom(e.target)}>{'▼'}</div> */}
        </div>
  }</>)

  function gotoBottom(element: any){
    element.parentElement.scrollTop = element.parentElement.scrollHeight - element.parentElement.clientHeight;
  }

  function shareFacebook() {
    let shareHtml = `
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="https://veggyline.com/favicon.ico?v=2"/>
        <meta name="description" content="VeggyLine"/>
        <meta property="fb:app_id"             content='512801023252803' />
        <meta property="og:url"                content='https://veggyline.com/blogs/blog?id=111' />
        <meta property="og:type"               content="website" />
        <meta property="og:title"              content="${stBlog.title}" />
        <meta property="og:description"        content="${stBlog.description}" />
        <meta property="og:image"              content="https://veggyline.com/images/${stBlog.image}" />
        <title>VeggyLine2</title>
      </head>
      <body>
        <script>
          window.open('https://www.facebook.com/dialog/share?app_id=512801023252803&href=https://veggyline.com/blogs/blog?id=112&feature=share&display=popup', '_self');
        </script>
      </body>
    </html>
    `;

    let dialog = 'location=yes,height=570,width=520,scrollbars=yes,status=yes';
    let facebookLink = `https://www.facebook.com/dialog/share?app_id=512801023252803&href=https://veggyline.com/share/facebook/blogs/${stBlog.blog_id}.html
    &display=popup`;
    window.open(facebookLink, 'Facebook share', dialog);

    // var newWin = window.open('','Facebook share','location=yes,height=570,width=520,scrollbars=yes,status=yes');
    // if (newWin) newWin.document.write(shareHtml);
  }
}

export default Blog;