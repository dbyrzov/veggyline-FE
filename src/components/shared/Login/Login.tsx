import React from 'react';
import styles from './Login.module.css';
import SharedContext from '../../../services/context-store'
import { handleSuccessLogin, login } from '../../../services/backend.js'
import { navigate } from '@reach/router';


export default class Login extends React.Component<any> {
  state = {
    username: '', password: '', remember: false,
  }

  render() {
    return <>
        <div className={styles.Login}>
          <input type="text" className={styles.inputField} placeholder='username' title='' onChange={(e) => {this.setState({username: e.target.value})}}/>
          <input type="password" className={styles.inputField} placeholder='password' title='' onChange={(e) => {this.setState({password: e.target.value})}}/>
          <label className={styles.remForm} htmlFor={styles.remember}>
            <input id={styles.remember} type="checkbox" defaultChecked={this.state.remember} onChange={() => {this.setState({remember: !this.state.remember})}}/>
            <span className={styles.chkRem}>Remember</span>
          </label>
          <button onClick={() => this.submit()}>Submit</button>
        </div>
      </>
  }

  submit() {
    console.log(this.state.username)
    console.log(this.state.password)
    console.log(this.state.remember)
    if (!this.state.username || this.state.username.length < 1 || !this.state.password || this.state.password.length < 1) {
      this.context.showError('Empty username or password!');
    } else {
      login(this.state.username, this.state.password)
        .then(res => {
          if (res) {
            console.log(res.data)
            this.context.setLoggedIn(true);
            this.context.setUsername(this.state.username);
            if (res.data.role === 1) this.context.setIsAdmin(true); else this.context.setIsAdmin(false);
            handleSuccessLogin(this.state.username, this.state.password, res.data.token, res.data.role, this.state.remember);

            navigate('/home');
          }
        })
        .catch(err => {
          this.context.handleErrors(err);
          this.context.setLoggedIn(false);
        });
    }
  }
}

Login.contextType = SharedContext;
