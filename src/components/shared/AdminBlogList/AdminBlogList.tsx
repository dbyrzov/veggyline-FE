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
        console.log(categories)
        httpget('/blog/search')
          .then(res => {
            let tmp_blogs: BlogModel[] = res.data.blogs;
            console.log(tmp_blogs)
            // tmp_blogs.forEach(blog => {
            //   let tmp_categs: Category[] = JSON.parse(JSON.stringify(categories));

            //   tmp_categs.forEach(c => {
            //     if (checkForMatch(blog.categories, "category_id", c.category_id)) {
            //       console.log('vlqzohme')
            //       c.checked = true;
            //     } else  {
            //       console.log('ne vlqzohme')
            //       c.checked = false;
            //     }
            //   });
            //   console.log(tmp_categs)
            //   blog.categories = tmp_categs;
            // })
            setBlogList(tmp_blogs);      
            ctx.setLoading(false);
        }).catch(err => { ctx.handleErrors(err.message);});
      }
    }).catch(err => { ctx.handleErrors(err);});
 
  }, []);

  return (
    <div className={styles.AdminBlogList}>
      {
        blogList.map((blog: BlogModel) => (
          <div key={blog.blog_id} className={styles.blogCard}>
            <div className={styles.cbCategory}>
              <input type="text" defaultValue={blog.blog_id} disabled/>
              <input type="text" defaultValue={blog.title} onChange={(e) => {blog.title = e.target.value}}/>
              <input type="text" defaultValue={blog.image} onChange={(e) => {blog.image = e.target.value}} disabled/>
              <input type="file" onChange={(e) => { imageObjects.push({blog_id: blog.blog_id, image: e.target.files != null?e.target.files[0]:''});}}/>
            </div>

            <textarea name="content" defaultValue={blog.content} onChange={(e) => {blog.content = e.target.value}} rows={10} style={{width: '100%', marginTop: '0.5rem'}}></textarea>
            <textarea name="description" defaultValue={blog.description} onChange={(e) => {blog.description = e.target.value}} rows={2} style={{width: '100%'}}></textarea>

            <div className={styles.cbCategory}>
              {
                blog.categories.map(c => (
                  <div key={c.category_id} style={{display: 'flex', flexDirection: 'row'}}>
                  <label htmlFor={c.category_id+''}>{c.name}</label><br></br>
                  <input type="checkbox" onChange={() => {c.checked = !c.checked;}} id={c.category_id+''} name={c.name} defaultChecked={c.checked}/>
                </div>
                ))
              }
              <button onClick={() => saveBlog(blog)}>Save</button>
            </div>

          </div>
        ))
      }
    </div>
  )

  function saveBlog(blog: BlogModel) {
    if (window.confirm('Are you sure you want to save the blog into the database?')) {
      // let blog: BlogModel[] = blogList.filter((blog:BlogModel) => {return blog.blog_id === blog_id})[0];


      httppost('/blog/add', {blog: blog})
      .then(res => {
        if (res) {
          console.log(res)
          const formData = new FormData();
          let image = imageObjects.find(img => { return img.blog_id === blog.blog_id});
          if (image?.image !== '') {
            formData.append('image', image?.image);
            console.log(formData)
            httppost('/blog/image', formData, {blogId: blog.blog_id})
              .then(res => { ctx.showInfo(res.data);})
              .catch(err => {ctx.handleErrors(err.message);})
          } else {
            ctx.handleErrors("Image not provided!");
          }
        }
      }).catch(err => {ctx.handleErrors(err.message);});

      console.log('Thing was saved to the database.');
      // console.log(blog);
    }
  }

  function checkForMatch(array: any, propertyToMatch: any, valueToMatch: number){
    for(var i = 0; i < array.length; i++){
        if(array[i][propertyToMatch] === valueToMatch)
            return true;
    }
    return false;
  }
};


export default AdminBlogList;
