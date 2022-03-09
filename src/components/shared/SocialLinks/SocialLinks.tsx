import React from 'react';
import styles from './SocialLinks.module.css';
import facebook from '../../../images/facebook.png';
import instagram from '../../../images/instagram.png';
import { navigate } from '@reach/router';

const SocialLinks: React.FC = () => (
  <div className={styles.social}>
    <div className={styles.socialLinks}>
      <img src={facebook} className={styles.navIcon} alt="" title="Facebook" onClick={() => {navigate('https://facebook.com/Veggylin3/?_rdr');}}/>
      <img src={instagram} alt="" title="Instagram" onClick={() => {navigate('https://www.instagram.com/veggy_line/?fbclid=IwAR360HZP-YKkyJv4FwSvNc_CUtDUkmObYtwiZZLuOOCmz8gyDS-hBeabh2I');}}/>
    </div>
  </div>
)

export default SocialLinks;
