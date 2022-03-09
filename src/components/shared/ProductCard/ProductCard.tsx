import React, { useContext, useState } from 'react';
import { ButtonGroup, Button } from '@material-ui/core';

import styles from './ProductCard.module.css';
import SharedContext from '../../../services/context-store';

const ProductCard: React.FC<any> = (props) => {
  const ctx = useContext(SharedContext);
  const [productCount, setProductCount] = useState(0);

  return (<>
    <div className={styles.elwrapper}>
      <div className={styles.boxup} style={{backgroundImage: `URL("https://veggyline.com/images/${props.product.image}")`, 
        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
      </div>
      <div className={styles.imginfo}>
        <div className={styles.infoinner}>
          <span className={styles.pname} style={{opacity: '1'}}>{props.product.title}</span>
          <span className={styles.pcompany}>sweet</span>
        </div>
        <div className={styles.asize}>Description: <div className={styles.size}>{props.product.descripiton}</div></div>
      </div>

      <div className={styles.boxdown}>
        <div className={styles.hbg}></div>

        <a className={styles.cart}>
          <span className={styles.price}>${props.product.price}</span>
          <span className={styles.addtocart}>
            <ButtonGroup size="small" variant="contained" aria-label="button group">
              <Button onClick={() => handleProductCount(0)}>-</Button>
              <Button >{productCount}</Button>
              <Button onClick={() => handleProductCount(1)}>+</Button>
            </ButtonGroup>
            <span className={styles.txt}>$: {(props.product.price*productCount).toFixed(2)}</span>
            <span className={styles.addbtn} onClick={() => {addToCart()}}>Add</span>
          </span>
        </a>
      </div>
    </div>
  </>);

  function handleProductCount(increase: number) {
    if (increase) {setProductCount(productCount + 1);}
    else {setProductCount(productCount - 1);}
    return null;
  };

  function addToCart() {
    props.product.quantity = productCount;
    ctx.addProductToBasket(props.product);
  }


};

export default ProductCard;
