import React, { useContext, useState } from 'react';
import { Button, TextInput } from 'react-native';
import { httpget, httppost } from '../../../services/backend';
import SharedContext from '../../../services/context-store';
import styles from './NewCategory.module.css';

const NewCategory: React.FC<any> = (props) => {
  const ctx = useContext(SharedContext);
  const [category, setCategory] = useState('');

  return (
    ctx.isAdmin ?
      <div className={styles.NewCategory}>
        <label htmlFor={styles.adminNewCategory}>
          <span className={styles.adminBlogsLabel}>New category: </span>
          <input id={styles.adminNewCategory} type="text" onChange={ (e) => setCategory(e.target.value)}/>
        </label>

        <Button title='Save' onPress={saveCategory}></Button>
      </div>
    : <div>You are not allowed here!</div>
  )

  function saveCategory() {
    if (category.length > 0) {
      httppost('/category/add', {category: category})
      .then(res => { if(res.data) ctx.showInfo(res.data);})
      .catch(err => { ctx.handleErrors(err)});
    } else {
      ctx.handleErrors({message: "Empty value for new category!"});
    }
  }
};

export default NewCategory;
