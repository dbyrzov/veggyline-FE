import React from 'react';
import styles from './Error.module.css';
import SharedContext from '../../../services/context-store'


export default class Error extends React.Component {
  render() {
    return (
      <div className={styles.Error} style={{backgroundColor: this.context.color}}>
        {this.context.infoMessage}
      </div>
    )
  }
}
Error.contextType = SharedContext;
