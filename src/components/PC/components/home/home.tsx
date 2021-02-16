import React, { useContext, useEffect, useState } from 'react';

import { httpget } from '../../../../services/backend.js'
import SharedContext from '../../../../services/context-store.js';
import BlogCard from '../../../shared/BlogCard/BlogCard';
import styles from './home.module.css';

const Home: React.FC<any> = () => {
  const ctx = useContext(SharedContext);
  const [lastBlogs, setLastBlogs] = useState([]);
  const [slogan, setSlogan] = useState('');
  let sloganList: [{slogan_id: number, name: string}];
  let pos = 0;
  let timeOut: any;

  useEffect( () => {
    httpget('/blogs/latest')
    .then(res => {
      if (res) {
        setLastBlogs(res.data);
      }
    })
    .catch(err => { ctx.handleErrors(err);});
  }, []);

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

  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
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

  return (<>
    <div className={styles.main}>
      <Slogan slogan={slogan}/>
      <div id={styles.latestBlogs}>
        { 
          lastBlogs.map( (blog:any) =>
            <BlogCard key={blog.blog_id} blog={blog} />
          )
        }
      </div>
    </div>
  </>);

};

export default Home;

const Slogan: React.FC<any> = (props) => {
  return (<>
    <div className={styles.slogan}>{props.slogan}</div>
  </>);
}
