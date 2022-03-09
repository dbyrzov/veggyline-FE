import { navigate } from '@reach/router';
import React from 'react';
import Category from '../../../models/Category';
import styles from './BlogCard.module.css';


class BlogCard extends React.Component<any> {

  render() {

    // let imageUrl = window.location.origin + '/images/';
    let imageUrl = 'url("https://veggyline.com/images/';
    if (this.props.blog.image && this.props.blog.image.length > 0) {
      imageUrl += this.props.blog.image + '"';
    } else {
      imageUrl += 'no_image.png"';
    }

    return <>
      <div className={styles.card} 
          style={{backgroundImage: imageUrl, 
          backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        <div className={styles.content}>
          <h2 className={styles.title}>{this.props.blog.title}</h2>
          <p className={styles.copy}>{this.props.blog.description}</p>
          <div className={styles.categoryList}>
            {
              this.props.blog.categories.map((category:Category) => 
                <p key={category.category_id+this.props.blog.blog_id} className={styles.copy}>{category.name}</p>
              )
            }
          </div>
          <button className={styles.btn} onClick={()=> this.gotoBlog(this.props.blog.blog_id)}>View</button>
        </div>
      </div>
    </>
  }
  gotoBlog(id: number) {
    let path = window.location.origin + '/blogs/blog?id=' + id;
    navigate(path, { replace: false });
  }
}

export default BlogCard;
