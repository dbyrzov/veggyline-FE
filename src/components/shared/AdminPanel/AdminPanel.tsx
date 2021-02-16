import { navigate } from '@reach/router';
import React from 'react';
import { Button } from 'react-native'
import styles from './AdminPanel.module.css';


class AdminPanel extends React.Component<any> {
  state = {
    isAdmin: false,
  }
  render() {
    return (
      <>
      {
        this.state.isAdmin 
        ?
          <main className={styles.main}>
            <Button title='Add new blog' onPress={() => {this.gotoNewBlog()}}></Button>
            <Button title='Add new slogan' onPress={() => {this.gotoNewSlogan()}}></Button>
            <Button title='Edit blogs' onPress={() => {this.gotoBlogList()}}></Button>
            {/* <Button title='Create new blog' onPress={() => {this.gotoCreateBlog()}}></Button> */}
          </main>
        :
        null
      }
      </>
    )
  }

  componentDidMount() {
    let role;
    console.log(sessionStorage.getItem('username'))
    console.log(sessionStorage.getItem('role'))
    if (sessionStorage.getItem('username') && (role = sessionStorage.getItem('role')) ) {
      console.log(role)
      if (Number(role) === 1) {
        this.setState({isAdmin: true});
      }
    }
  }

  gotoNewBlog() {
    navigate(window.location.origin + '/admin/blogs/add');
  }

  gotoNewSlogan() {
    navigate(window.location.origin + '/admin/slogans/add');
  }

  gotoBlogList() {
    navigate(window.location.origin + '/admin/blogs');
  }
}

export default AdminPanel;
