import React, { useContext, useEffect, useState } from 'react';
import BlogModel from '../../../models/Blog';
import Category from '../../../models/Category';
import { httpget, httppost } from '../../../services/backend';
import SharedContext from '../../../services/context-store';
import styles from './AdminBlogList.module.css';

const AdminBlogList: React.FC<any> = () => {
  const ctx = useContext(SharedContext);
  // let blogList: BlogModel[] = [];
  const [blogList, setBlogList] = useState(new Array<BlogModel>());
  let categories: Category[] = [];
  let imageObjects: {blog_id: number, image: any}[] = [];

  useEffect( () => {
    httpget('/categories').then((res:any) => {
      if (res) {
        categories = res.data;
        console.log(categories);
        httpget('/blogs')
          .then(res => {
            let tmp_blogs: BlogModel[] = res.data;
            console.log("tmp_blogs")
            console.log(tmp_blogs)
            tmp_blogs.forEach(blog => {
              let tmp_categs: Category[] = JSON.parse(JSON.stringify(categories));
              console.log(tmp_categs)
              tmp_categs.forEach(c => {
                blog.categories.forEach(bloCateg => {
                  console.log('Categ')
                  console.log(bloCateg.category_id)
                  console.log(c.category_id)
                  if (Number(bloCateg.category_id) === Number(c.category_id)) {c.checked = true;} 
                  else {c.checked = false;}
                });
              });
              // blog.categories = tmp_categs;
            });
            setBlogList(tmp_blogs);      
            ctx.setLoading(false);
        }).catch(err => { ctx.handleErrors(err.message);});
      }
    }).catch(err => { ctx.handleErrors(err);});
 
  }, []);

  return (
    ctx.isAdmin?
    <div className={styles.AdminBlogList}>
      {
        blogList.map((blog: BlogModel) => (
          <div key={blog.blog_id} className={styles.blogCard}>
            <div className={styles.cbCategory}>
              <input type="text" defaultValue={blog.blog_id} disabled/>
              <label htmlFor={styles.adminTitle}>
                <span className={styles.adminBlogsLabel}>Title: </span>
                <input id={styles.adminTitle} type="text" defaultValue={blog.title} onChange={(e) => {blog.title = e.target.value}}/>
              </label>
              <label htmlFor={styles.adminImage}>
                <span className={styles.adminBlogsLabel}>Image: </span>
                <input id={styles.adminImage} type="text" defaultValue={blog.image} onChange={(e) => {blog.image = e.target.value}} disabled/>
              </label>
              <input type="file" onChange={(e) => { imageObjects.push({blog_id: blog.blog_id, image: e.target.files != null?e.target.files[0]:''});}}/>
            </div>
            <label htmlFor={styles.adminContent}>
              <span className={styles.adminBlogsLabel}>Content: </span>
              <textarea id={styles.adminContent} name="content" defaultValue={blog.content} 
                onChange={(e) => {blog.content = e.target.value}} rows={10} style={{width: '100%', marginTop: '0.5rem'}}>
              </textarea>
            </label>
            <label htmlFor={styles.adminDescription}>
              <span className={styles.adminBlogsLabel}>Description: </span>
              <textarea id={styles.adminDescription} name="description" defaultValue={blog.description} 
                onChange={(e) => {blog.description = e.target.value}} rows={2} style={{width: '100%'}}>
              </textarea>
            </label>

            <div className={styles.cbCategory}>
              {
                blog.categories.map(c => (
                  <div key={c.category_id} style={{display: 'flex', flexDirection: 'row'}}>
                    <label htmlFor={c.category_id+''}>{c.name}
                      <input type="checkbox" onChange={() => {c.checked = !c.checked;}} id={c.category_id+''} name={c.name} defaultChecked={c.checked}/>
                    </label>
                  </div>
                ))
              }
              <button onClick={() => updateBlog(blog)}>Save</button>
              <button onClick={() => deleteBlog(blog)}>Delete</button>
            </div>

          </div>
        ))
      }
    </div>
    : <div>You are not allowed here!</div>
  )

  function updateBlog(blog: BlogModel) {
    if (window.confirm(`Are you sure you want to update the blog "${blog.title}"?`)) {
      // let blog: BlogModel[] = blogList.filter((blog:BlogModel) => {return blog.blog_id === blog_id})[0];
      httppost('/blog/update', {blog: blog})
      .then(res => {
        if (res) {
          console.log(res)
          const formData = new FormData();
          let image = imageObjects.find(img => { return img.blog_id === blog.blog_id});
          console.log("image")
          console.log(image)
          if (image && image?.image !== '') {
            formData.append('image', image?.image);
            console.log(formData)
            httppost('/blog/image', formData, {blogId: blog.blog_id})
              .then(res => { ctx.showInfo(res.data);})
              .catch(err => {ctx.handleErrors(err);})
          } else {
            ctx.handleErrors({message: "Image not provided!"});
          }
        }
      }).catch(err => {ctx.handleErrors(err);});

      // console.log('Thing was saved to the database.');
    }
  }

  function deleteBlog(blog: BlogModel) {
    if (window.confirm(`Are you sure you want to delete the blog "${blog.title}"?`)) {
      httppost('/blog/delete', {blog: blog} )
        .then(res => { if (res && res.data) {setBlogList(res.data); ctx.showInfo({message: "Blog deleted!"})} else {ctx.showError("Something went wrong!")}})
        .catch(err => { ctx.handleErrors(err); });
    }
  }

  function checkForMatch(array: any, propertyToMatch: any, valueToMatch: number){
    for(var i = 0; i < array.length; i++){
      console.log('loop')
      console.log(array[i][propertyToMatch])
        if(array[i][propertyToMatch] === valueToMatch)
            return true;
    }
    return false;
  }
};


export default AdminBlogList;
