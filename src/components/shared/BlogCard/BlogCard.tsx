import { navigate } from '@reach/router';
import React from 'react';
import Category from '../../../models/Category';
import styles from './BlogCard.module.css';


class BlogCard extends React.Component<any> {
  render() {
    return <>
      <div key={this.props.blog.blog_id} className={styles.card} style={{backgroundImage: 'url(' + require('../../../images/' + this.props.blog.image) + ')', backgroundSize: 'cover'}}>
        <div className={styles.content}>
          <h2 className={styles.title}>{this.props.blog.title}</h2>
          <p className={styles.copy}>{this.props.blog.description}</p>
          <div className={styles.categoryList}>
            {
              this.props.blog.categories.map((category:Category) => 
                <p key={category.category_id} className={styles.copy}>{category.name}</p>
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
