import { navigate } from '@reach/router';
import React, { useContext } from 'react';
import { Button } from 'react-native'
import SharedContext from '../../../services/context-store';
import styles from './AdminPanel.module.css';
import { logout, handleLogout } from '../../../services/backend.js'



const AdminPanel: React.FC<any> = () => {
  const ctx = useContext(SharedContext);

  return (
      ctx.isAdmin ?
        <main className={styles.main}>
          <div>
            <Button title='Add new blog' onPress={gotoNewBlog}></Button>
            <Button title='Add new category' onPress={gotoNewCategory}></Button>
            <Button title='Add new slogan' onPress={gotoNewSlogan}></Button>
          </div>

          <div>
            <Button title='Edit blogs' onPress={gotoBlogList}></Button>
            <Button title='Edit categories' onPress={gotoCategoryList}></Button>
            <Button title='Edit slogans' onPress={gotoSloganList}></Button>
          </div>

          <div>
            <Button title='Logout' onPress={gotoLogout} color="#f194ff"></Button>
          </div>
        </main>
      : <div>You are not allowed here!</div>
  )

  function gotoNewBlog() { navigate(window.location.origin + '/admin/blogs/add');}
  function gotoNewSlogan() { navigate(window.location.origin + '/admin/slogans/add');}
  function gotoBlogList() { navigate(window.location.origin + '/admin/blogs');}
  function gotoCategoryList() { navigate(window.location.origin + '/admin/categories');}
  function gotoSloganList() { navigate(window.location.origin + '/admin/slogans');}
  function gotoNewCategory() { navigate(window.location.origin + '/admin/category/add');}
  function gotoLogout() {
    logout().then(res => {
      console.log(res);
      ctx.setLoggedIn(false);
      ctx.setIsAdmin(false);
      ctx.setUsername('');

      handleLogout();
    }).catch(err => {ctx.handleErrors(err)});
  }
}
export default AdminPanel;
