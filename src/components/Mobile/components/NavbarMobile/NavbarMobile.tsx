import { Link, navigate } from '@reach/router';
import React, { useContext, useState } from 'react';
import SharedContext from '../../../../services/context-store';
import styles from './NavbarMobile.module.css';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavbarMobile: React.FC<any> = () => {

  const ctx = useContext(SharedContext);

  const [isOpenMenu, setOpenMenu] = useState('none');

  return (<>
    <div className={styles.navbar}>
      <div className={styles.firstNav}>
        <img className={styles.navLogo} src={require('../../../../images/logo.png')} alt="Veggyline" onClick={gotoHome}/>
        <div id={styles.navBurger}><i className="fa fa-bars" onClick={openMenu}></i></div>
      </div>


      <div id={styles.navLinks} style={{display: isOpenMenu}}>
          <Link className={styles.links} to="/home">Home</Link>
          <Link className={styles.links} to="/blogs">Blogs</Link>
          {/* <Link className={styles.links} to="/shop">Shop</Link> */}
          <Link className={styles.links} to="/about">About</Link>
          {
            ctx.isLoggedIn
            ?
              <div className={styles.links} onClick={() => {navigate('/admin')}}>
                <FontAwesomeIcon icon={faUserCircle} style={{fontSize: 26, color: 'rgb(179, 74, 48)', marginRight: '.5em'}}/>
                {ctx.username}
                {/* <div className={styles.navProfileLinks}>
                  <Link style={{textDecoration: 'none', color: 'rgb(179, 74, 48)'}} to="/about">Profile</Link>
                  <Link style={{textDecoration: 'none', color: 'rgb(179, 74, 48)'}} to="/blog/add">Add blog</Link>
                  <Link style={{textDecoration: 'none', color: 'rgb(179, 74, 48)'}} to="/slogan/add">Add slogan</Link>
                </div> */}

              </div>
            :
            <Link className={styles.links} to="/login">Login</Link>
          }
          {/* <SocialLinks/> */}
        </div>

      {/* <div id={styles.socialLinksMobile}>
        <SocialLinks/>
      </div> */}

      {/* <div className={styles.firstNav}> */}
      {/* </div> */}

      {/* <div id={styles.login}>
        {
          ctx.isLoggedIn
          ?
            <div className={styles.links} onClick={() => {navigate('/admin')}}>
              <FontAwesomeIcon icon={faUserCircle} style={{fontSize: 26, color: 'rgb(179, 74, 48)', marginRight: '.5em'}}/>
              {ctx.username}
            </div>
          :
          <Link className={styles.links} to="/login">Login</Link>
        }
      </div> */}


      {/* <div className={styles.menuNav}>
        <Link className={styles.links} to="/home">Home</Link>
        <Link className={styles.links} to="/blogs">Blogs</Link>
        <Link className={styles.links} to="/about">About</Link>
      </div>       */}

    </div>  
  </>);

  function gotoHome() {
    let path = window.location.origin + '/home';
    navigate(path);
  }

  function openMenu() {
    if (isOpenMenu === 'none') {
      setOpenMenu('flex');
    } else {
      setOpenMenu('none');
    }

  }
};



export default NavbarMobile;
