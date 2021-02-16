import React, { useContext, useEffect, useState } from 'react';
import { httpget, httppost } from '../../../../services/backend';
import SharedContext from '../../../../services/context-store';
import BlogCard from '../../../shared/BlogCard/BlogCard';
import styles from './HomeMobile.module.css';

const HomeMobile: React.FC<any> = () => {
  const ctx = useContext(SharedContext);
  let sloganList: [{slogan_id: number, name: string}];
  const [slogan, setSlogan] = useState('');
  const [lastBlogs, setLastBlogs] = useState([]);
  let pos = 0;
  let timeOut: any;

  useEffect( () => {
    httpget('/slogans')
    .then(res => {
      if (res) {
        sloganList = res.data;
        handleSloganChange();
      }
    })
    .catch(err => { ctx.handleErrors(err);});
  }, []);

  useEffect( () => {
    httpget('/blogs/latest')
    .then(res => {
      if (res) {
        setLastBlogs(res.data);
      }
    })
    .catch(err => { ctx.handleErrors(err);});
  }, []);
 
  function handleSloganChange() {
    if (sloganList.length > 0) {
      if (pos === 0) {
        pos++;
      } else {
        if (pos === sloganList.length - 1) {
          pos = 0;
        } else {
          pos++;
        }
      }
      setSlogan(sloganList[pos].name);
      timeOut = setTimeout(handleSloganChange, 5000);
    }
  }

  return <div className={styles.HomeMobile}>
    <div className={styles.newsText}>Slogans of the day</div>
    <div className={styles.smallDiv}>
      <div className={styles.slogan}>{slogan}</div>
    </div>
    <div className={styles.newsText}>What's new</div>

    <div className={styles.smallDiv}>
      <div id={styles.latestBlogs}>
          { 
            lastBlogs.map( (blog:any) =>
              <BlogCard key={blog.blog_id} blog={blog} />
            )
          }
        </div>
    </div>

  </div>
};

export default HomeMobile;
