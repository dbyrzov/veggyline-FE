import { Link } from '@reach/router';
import React from 'react';
import SocialLinks from '../SocialLinks/SocialLinks';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <div className={styles.Footer} style={{zIndex: 99}}>
    <h3>VeggyLine</h3>
    <div className={styles.links}>
      {/* <Link to="/about">Contact us</Link> */}
      {/* <Link to="/about">FAQ</Link> */}
      <Link to="/about">About</Link>
    </div>
    <SocialLinks/>

    <div className={styles.rights}>© VeggyLine. All rights reserved.</div>


  </div>
);

export default Footer;
