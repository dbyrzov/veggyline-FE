import React from 'react';
import styles from './Loading.module.css';
import ReactLoading from 'react-loading';

const Loading: React.FC = () => (
  <ReactLoading type="spinningBubbles" color="#ced124"  height={80} width={80} className={styles.Loading} />
);

export default Loading;
