import React, { useContext } from 'react';

import { Link, navigate } from '@reach/router';
import styles from './navbar.module.css';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';
import SharedContext from '../../../../services/context-store'
import SocialLinks from '../../../shared/SocialLinks/SocialLinks';


const Navbar: React.FC = () => {
  const ctx = useContext(SharedContext);

  return (<>
    <div className={styles.navbar}>
      <img className={styles.navLogo} src={require('../../../../images/logo.png')} alt="Veggyline" onClick={gotoHome}/>
        <div id={styles.navLinks}>
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
              </div>
            :
            <Link className={styles.links} to="/login">Login</Link>
          }
          <SocialLinks/>
        </div>
    </div>
  </>);
};
export default Navbar;


function gotoHome() {
  let path = window.location.origin + '/home';
  navigate(path);
}
