import React, { useContext, useEffect, useState } from 'react';
import Category from '../../../models/Category';
import { httpget, httppost } from '../../../services/backend';
import SharedContext from '../../../services/context-store';
import styles from './AdminCategoryList.module.css';

const AdminCategoryList: React.FC<any> = () => {
  const ctx = useContext(SharedContext);
  const [categoryList, setCategoryList] = useState(new Array<Category>());

  useEffect( () => {
    httpget('/categories').then(res => {
      if (res) {
        setCategoryList(res.data);
      }
    })
  }, []);

  return (
    ctx.isAdmin?
    <div className={styles.AdminCategoryList}>
      {
        categoryList.map((category: Category) => (
          <label key={category.category_id} className={styles.adminCategoriesLabel}>
            <span >Category: </span>
            <input type="text" 
              defaultValue={category.name} 
              className={styles.category}
              onChange={(e) => changeCategory(category, e.target.value)}
            />
            <button onClick={() => updateCategory(category)}>Update</button>
            <button onClick={() => deleteCategory(category)}>Delete</button>
          </label>
        ))
      }
    </div>
    : <div>You are not allowed here!</div>
  );

  function updateCategory(category: Category) {
    if (window.confirm(`Are you sure you want to update the category "${category.name}"?`)) {
      httppost('/category/update', {category: category} )
        .then( (res) => {ctx.showInfo("Category updated!"); setCategoryList(res.data);})
        .catch( (err:any) => {ctx.handleErrors(err); });
    }

  }

  function deleteCategory(category: Category) {
    if (window.confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
      httppost('/category/delete', {category: category} )
        .then( (res) => {ctx.showInfo("Category deleted!"); setCategoryList(res.data);})
        .catch( (err:any) => {ctx.handleErrors(err); });
    }
  }

  function changeCategory(category: Category, value: string) {
    let categories: Array<Category> = new Array<Category>();
    categories = JSON.parse(JSON.stringify(categoryList));
    categories.forEach(c => {
      if (c.category_id === category.category_id) {
        c.name = value;
      }
    });
    setCategoryList(categories);
  }
};

export default AdminCategoryList;
