import React, { useContext, useEffect, useState } from 'react';

import { httpget } from '../../../../services/backend.js'
import SharedContext from '../../../../services/context-store.js';
import BlogCard from '../../../shared/BlogCard/BlogCard';
import styles from './home.module.css';
import background from '../../../../images/sun_background.jpg';

const Home: React.FC<any> = () => {
  const ctx = useContext(SharedContext);
  const [lastBlogs, setLastBlogs] = useState([]);
  const [slogan, setSlogan] = useState('');
  let sloganList: [{slogan_id: number, name: string}];
  let pos = 0;
  let timeOut: any;

  useEffect( () => {
    httpget('/slogans/random')
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
      timeOut = setTimeout(handleSloganChange, 7000);
    }
  }

  useEffect( () => {
    httpget('/blogs/latest')
    .then(res => {
      if (res && res.data) {
        console.log(res.data);
        setLastBlogs(res.data);
      }
    })
    .catch(err => { ctx.handleErrors(err);});
  }, []);


  useEffect( () => {
    let el = document.getElementById("router");
    if(el) el.style.height = '87%';

    return () => {
      let el = document.getElementById("router");
      if(el) el.style.height = 'auto';
    };
  }, []);


  return (
    <div className={styles.main}>
      <Slogan className={styles.slogan} slogan={slogan}/>
      {/* <img src={background} alt="cover" style={{zIndex: 0, height: '100%'}}/> */}
      <div className={styles.cover}>
        <div id={styles.latestBlogs}>
          {
            lastBlogs.map( (blog:any) =>
              <BlogCard key={blog.blog_id} blog={blog} />
            )
          }
        </div>
      </div>
    </div>);

};

export default Home;

const Slogan: React.FC<any> = (props) => {
  return (<>
    <div className={styles.slogan}>{props.slogan}</div>
  </>);
}
