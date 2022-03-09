import React, { useContext, useEffect, useRef } from 'react';
import { Popper, Card, List, ListItem, Button } from '@material-ui/core';
import { Link, navigate } from '@reach/router';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../../node_modules/font-awesome/css/font-awesome.min.css';

import styles from './navbar.module.css';
import SharedContext from '../../../../services/context-store'
import SocialLinks from '../../../shared/SocialLinks/SocialLinks';
import { checkSession, getUserAndRole } from '../../../../services/backend';
import ProductModel from '../../../../models/Product';


const Navbar: React.FC = () => {
  const ctx = useContext(SharedContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!anchorEl ) setAnchorEl(event.currentTarget);
    else handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openBasket = () => {
    handleClose();
  }

  const removeProduct = (product:ProductModel) => {
    ctx.delProductFromBasket(product);
  }



  useEffect(() => {
    if (checkSession()) {
      let usrAndRole;
      if ((usrAndRole = getUserAndRole()) != null) {
        ctx.setUsername(usrAndRole.user);
        if (Number(usrAndRole.role) === 1) {ctx.setIsAdmin(true);} 
        else {ctx.setIsAdmin(false)};
        ctx.setLoggedIn(true);
      } else {ctx.setLoggedIn(false);}
    }

    let basketCnt = localStorage.getItem('veggyBasketProducts');
    if (basketCnt) {ctx.setBasketCount(basketCnt);}

    console.log("sadasdsadsad");
    console.log(ctx.orderProducts);
  }, []);


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
          <i aria-describedby={id} className={"fa " + styles.basket} style={{fontSize: '32px'}} onClick={handleClick}>&#xf07a;</i>
          <span className={styles.badge + " " + styles.badgeWarning} id={styles.lblCartCount} > {ctx.basketCount} </span>
          <Popper id={id} open={open} anchorEl={anchorEl} style={{paddingTop: ".5rem", zIndex: 999, minWidth: '20rem'}}>
            <Card raised={true} variant="outlined" className={styles.basketPopup}>
              {
                ctx.orderProducts.map( (res:ProductModel) => 
                  <Card key={res.product_id} className={styles.cartCard}>
                    <div className={styles.basketImage} style={{backgroundImage: `url("https://veggyline.com/images/${res.image}")`}}></div>
                    <div className={styles.basketProduct}>
                      <div className={styles.basketProductName}>{res.title}</div>
                      <div className={styles.basketProductCntSum}>{res.quantity} x {res.price}</div>
                    </div>
                    <div className={styles.basketProductTotal}>{(res.quantity*res.price).toFixed(2)}<span>$</span></div>
                    <div className={styles.basketProductRemove} onClick={() => {removeProduct(res)}}>X</div>
                  </Card>
                )
              }
              <div className={styles.basketTotal}>Total: <span>{ctx.orderTotal}<span>$</span></span></div>
              <Button size="small" 
                variant="outlined" 
                color="secondary" 
                onClick={openBasket} 
                style={{color: '#d5310d', border: '1px solid #d5310d', alignSelf: 'flex-end'}}>
                Order
              </Button>
            </Card>
          </Popper>
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
