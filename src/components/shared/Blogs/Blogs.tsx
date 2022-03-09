import React, { useContext, useEffect, useState } from 'react';
import './Blogs.module.css';
import styles from './Blogs.module.css';
import { httpget, updateQueryParam } from '../../../services/backend.js'
import BlogModel from '../../../models/Blog';
import SharedContext from '../../../services/context-store'
import BlogCard from '../BlogCard/BlogCard';
import Category from '../../../models/Category';


const Blogs: React.FC<any> = (props) => {
  const ctx = useContext(SharedContext);
  const [keyword, setKeyword] = useState('');
  const [blogs, setBlogs] = useState(Array<BlogModel>());
  const [noLeft, setNoLeft] = useState('');
  const [noRight, setNoRight] = useState('');
  const [noLeftMobile, setNoLeftMobile] = useState('');
  const [noRightMobile, setNoRightMobile] = useState('');
  const [previousPage, setPreviousPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  let pageNumber = 1;
  const [categories, setCategories] = useState(Array<Category>());

  useEffect( () => {
    ctx.setLoading(true);
    setNoLeft(styles.leftPaginatorDisabled);
    setNoRight(styles.rightPaginatorDisabled);
    setNoLeftMobile(styles.botLeftPaginatorDisabled);
    setNoRightMobile(styles.botRightPaginatorDisabled);
    httpget('/categories')
      .then(res => {
        if (res) {
          let url = new URLSearchParams(window.location.search);
          let urlPage = url.get('page');
          let urlSearch = url.get('search');
          let urlCategories = url.get('categories');

          if (urlSearch) {setKeyword(urlSearch);}
          if (urlCategories) {
            let categs = res.data;
            categs.forEach((c:Category) => {
              if (urlCategories?.includes((c.category_id).toString())) { c.checked = true;} else {c.checked = false;}
            });
            setCategories(categs);
          } else {
            setCategories(res.data);
          }

          httpget('/blog/search', {page: urlPage, search: urlSearch, categories: urlCategories})
          .then(res => {
            handleSuccessfulBlogs(res);
            console.log(res);
          }).catch(err => { setBlogs([]); ctx.handleErrors(err);});
        }
      }).catch(err => { ctx.handleErrors(err);});

  }, []);

  return (
    <div className={styles.blogs}>
      <div id={styles.search}>
        <form role="search" className={styles.formBlogs}>
          <input id={styles.searchInput} type="search" value={keyword} 
          onChange={(e) => {
            setKeyword(e.target.value);
            updateQueryParam('search', e.target.value, false);
          }} 
            placeholder="Search..." autoFocus required />
          <button className={styles.searchBtn} type="button" onClick={searchBlog}>Go</button>
        </form>
        <div className={styles.checkboxBox}>
          {
            categories.map(cat => 
              <div key={cat.category_id} className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                    <input type="checkbox" defaultChecked={cat.checked} onChange={() => {cat.checked = !cat.checked;} }/>
                    {/* <input type="checkbox" checked={cat.checked} onChange={() => {cat.checked = !cat.checked;}}/> */}
                    <span className={styles.checkboxCustom + " " + styles.rectangular}></span>
                </label>
                <div className={styles.inputTitle}>{cat.name}</div>
              </div>
            )
          }
        </div>
      </div>
      <div className={styles.pageContent}>
      { blogs.map(res => 
        <BlogCard key={res.blog_id} blog={res} />
      )}
      </div>
      <div className={styles.prevNextBtns + ' ' + styles.noSelect + ' ' + noLeft} onClick={gotoPreviousPage}>
        {/* {"<"} */}
        &nbsp;&#10094;&nbsp;
      </div>
      <div className={styles.prevNextBtns + ' ' + styles.noSelect + ' ' + noRight} onClick={gotoNextPage}>
        {/* {">"} */}
        &nbsp;&#10095;&nbsp;
      </div>
      <div className={styles.prevNextBtnsMobile}>
        <div className={styles.prevNextBtnsMobile + ' ' + styles.noSelect + ' ' + noLeftMobile} onClick={gotoPreviousPage}>
          {/* {"<"} */}
          &nbsp;&#10094;&nbsp;
        </div>
        <div className={styles.prevNextBtnsMobile + ' ' + styles.noSelect + ' ' + noRightMobile} onClick={gotoNextPage}>
          {/* {">"} */}
          &nbsp;&#10095;&nbsp;
        </div>
      </div>
    </div>
  );

  function searchBlog() {
    let catList = getCheckedCategories();

    updateQueryParam('categories', catList, false);

    httpget('/blog/search', {search: keyword, categories: catList, page: pageNumber})
      .then(res => {
        handleSuccessfulBlogs(res);
      })
      .catch(err => { ctx.handleErrors(err);});
  }


  function gotoPreviousPage() {
    if (previousPage) {

      let page = new URLSearchParams(window.location.search).get('page');
      pageNumber = Number(page);
      let catList = getCheckedCategories();
      ctx.setLoading(true);

      httpget('/blog/search', {search: keyword, categories: catList, page: pageNumber-1})
      .then(res => {
        handleSuccessfulBlogs(res);
      })
      .catch(err => { ctx.handleErrors(err);});
    }

  }

  function gotoNextPage() {
    if (nextPage) {
      let page = new URLSearchParams(window.location.search).get('page');
      pageNumber = Number(page);
      let catList = getCheckedCategories();
      ctx.setLoading(true);

      httpget('/blog/search', {search: keyword, categories: catList, page: pageNumber+1})
      .then(res => {
        handleSuccessfulBlogs(res);
      })
      .catch(err => { ctx.handleErrors(err);});
    }
  }

  function getCheckedCategories() {
    let catList = '';
    categories.forEach(c => {
      if (c.checked === true) {
        catList += c.category_id + ',';
      }
    });
    if(catList.slice(-1) === ',') {catList = catList.slice(0, -1);}

    return catList;
  }

  function handleSuccessfulBlogs(res: any) {
    pageNumber = res.data.page;
    updateQueryParam('page', pageNumber, false);

    if (res.data.previus) {
      setPreviousPage(true);
      setNoLeft(styles.leftPaginator);
      setNoLeftMobile(styles.botLeftPaginator);
    } else {
      setPreviousPage(false);
      setNoLeft(styles.leftPaginatorDisabled);
      setNoLeftMobile(styles.botLeftPaginatorDisabled);
    }

    if (res.data.next) {
      setNextPage(true);
      setNoRight(styles.rightPaginator);
      setNoRightMobile(styles.botRightPaginator);
    } else {
      setNextPage(false);
      setNoRight(styles.rightPaginatorDisabled);
      setNoRightMobile(styles.botRightPaginatorDisabled);
    }
    setBlogs(res.data.blogs);
    ctx.setLoading(false);
  }
}
export default Blogs;



