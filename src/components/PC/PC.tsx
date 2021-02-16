import React, {useContext} from 'react';
import { Router } from '@reach/router';
import styles from './PC.module.css';

import NavBar from '../PC/components/navbar/navbar';
import Blogs from '../shared/Blogs/Blogs'
import Blog from '../shared/Blog/Blog'
import Shop from '../shared/Shop/Shop'
import Error from '../shared/Error/Error'
import SharedContext from '../../services/context-store'
import Login from '../shared/Login/Login';
import Loading from '../shared/Loading/Loading'
import NewBlog from '../shared/NewBlog/NewBlog';
import AdminPanel from '../shared/AdminPanel/AdminPanel';
import NewSlogan from '../shared/NewSlogan/NewSlogan';
import About from '../PC/components/About/About';
import Home from '../PC/components/home/home';
import Footer from '../shared/Footer/Footer';
import AdminBlogList from '../shared/AdminBlogList/AdminBlogList';

const PC: React.FC = () => {
  const ctx = useContext(SharedContext);

  return (<>
    {ctx.infoMessage.length > 0 ? <Error/> : null}
    {ctx.loading ? <Loading/> : null}
    <NavBar/>
    <Router className={styles.router}>
      <Home       path="/"/>
      <Home       path="/home"/>
      <Blogs      path="/blogs"/>
      <Shop       path="/shop"/>
      <Blog       path="/blogs/blog"/>
      <NewBlog    path="/admin/blogs/add"/>
      <Login      path="/login"/>
      <About      path="/about"/>
      <AdminPanel path="/admin"/>
      <NewSlogan  path="/admin/slogans/add"/>
      <AdminBlogList path="/admin/blogs"/>
    </Router>
    <Footer/>
  </>)

};
export default PC;
