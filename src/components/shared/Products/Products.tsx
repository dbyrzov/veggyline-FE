import React, { useContext, useEffect, useState } from 'react';
import { Pagination } from '@material-ui/lab';
import Category from '../../../models/Category';
import ProductModel from '../../../models/Product';
import { httpget, updateQueryParam } from '../../../services/backend';
import SharedContext from '../../../services/context-store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './Products.module.css';

const Products: React.FC<any> = (props) => {
  const ctx = useContext(SharedContext);
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState(Array<ProductModel>());
  
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState(Array<Category>());

  let prod_arr = [
    {product_id: 1, title: "Canned beans"                  , content: "This is the most awesome content", image: 'IMAGE-111.jpg', categories: ['one', 'two'], description: "Baken beans on low fire", price: 120   , quantity: 0},
    {product_id: 2, title: "Vacume fish"                   , content: "This is the most awesome content", image: 'IMAGE-112.jpg', categories: ['one', 'two'], description: "Baken beans on low fire", price: 1.25  , quantity: 0},
    {product_id: 3, title: "Peach from the granny's garden", content: "This is the most awesome content", image: 'IMAGE-117.jpg', categories: ['one', 'two'], description: "Baken beans on low fire", price: 24.34 , quantity: 0},
    {product_id: 4, title: "Canned beans"                  , content: "This is the most awesome content", image: 'IMAGE-121.jpg', categories: ['one', 'two'], description: "Baken beans on low fire", price: 98    , quantity: 0},
    {product_id: 5, title: "Canned beans"                  , content: "This is the most awesome content", image: 'IMAGE-124.jpg', categories: ['one', 'two'], description: "Baken beans on low fire", price: 54.12 , quantity: 0},
    {product_id: 6, title: "Canned beans"                  , content: "This is the most awesome content", image: 'IMAGE-125.jpg', categories: ['one', 'two'], description: "Baken beans on low fire", price: 12    , quantity: 0},
    {product_id: 7, title: "Canned beans"                  , content: "This is the most awesome content", image: 'IMAGE-112.jpg', categories: ['one', 'two'], description: "Baken beans on low fire", price: 227.05, quantity: 0}
  ];

  let arr = new Array<ProductModel>();
  prod_arr.forEach(r => {
    let s: ProductModel = new ProductModel();
    s.product_id = r.product_id;
    s.content = r.content;
    s.description = r.description;
    s.image = r.image;
    s.price = r.price;
    s.quantity = r.quantity;
    s.title = r.title;
    arr.push(s)
  });

  useEffect( () => {
    ctx.setLoading(true);
    httpget('/categories')
      .then(res => {
        if (res) {
          let url = new URLSearchParams(window.location.search);
          let urlPage = url.get('page');
          let urlSearch = url.get('search');
          let urlCategories = url.get('categories');

          console.log(urlPage)


          if (urlPage) {setPage(Number(urlPage));}
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

          // httpget('/product/search', {page: urlPage, search: urlSearch, categories: urlCategories})
          // .then(res => {
          //   handleSuccessfulBlogs(res);
          //   console.log(res);
          // }).catch(err => { setProducts([]); ctx.handleErrors(err);});
          setProducts(arr);
          ctx.setLoading(false);
        }
      }).catch(err => { ctx.handleErrors(err);});

  }, []);

  return (
    <div className={styles.products}>
      <div id={styles.search}>
        <form role="search" className={styles.formBlogs}>
          <input id={styles.searchInput} type="search" value={keyword} 
          onChange={(e) => {
            setKeyword(e.target.value);
            updateQueryParam('search', e.target.value, false);
          }} 
            placeholder="Search..." autoFocus required />
          <button className={styles.searchBtn} type="button" onClick={searchProduct}>Go</button>
        </form>
        <div className={styles.checkboxBox}>
          {
            categories.map(cat => 
              <div key={cat.category_id} className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                    <input type="checkbox" defaultChecked={cat.checked} onChange={() => {cat.checked = !cat.checked;} }/>
                    <span className={styles.checkboxCustom + " " + styles.rectangular}></span>
                </label>
                <div className={styles.inputTitle}>{cat.name}</div>
              </div>
            )
          }
        </div>
      </div>
      <div className={styles.pageContent}>
      { products.map(res => 
        <ProductCard key={res.product_id} product={res} />
      )}
      </div>
      <Pagination count={10} page={page} size="large" variant="outlined" color="secondary" onChange={handlePageChange} style={{marginTop: '1rem'}}/>
    </div>
  );

  function handlePageChange(event: React.ChangeEvent<unknown>, value: number) {
    setPage(value);
    updateQueryParam('page', value, false);
    // http to "value" page
  }

  function searchProduct() {
    let catList = getCheckedCategories();

    updateQueryParam('categories', catList, false);

    httpget('/product/search', {search: keyword, categories: catList, page: page})
      .then(res => {
        handleSuccessfulBlogs(res);
      })
      .catch(err => { ctx.handleErrors(err);});
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
    setPage(res.data.page);
    updateQueryParam('page', res.data.page, false);

    setProducts(res.data.products);
    ctx.setLoading(false);
  }
}

export default Products;
