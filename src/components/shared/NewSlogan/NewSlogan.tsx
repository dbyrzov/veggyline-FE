import React from 'react';
import { Button, TextInput } from 'react-native';
import { httppost } from '../../../services/backend';
import styles from './NewSlogan.module.css';

class NewSlogan extends React.Component<any> {
  state = {
    slogan: 'Enter slogan',
  }

  render() {
    return <div className={styles.slogan}>
      <TextInput style={{borderColor: 'black', borderWidth: 1, width: '100%'}}
        onChangeText={text => this.setState({slogan: text})}
        // value={this.state.title}
        placeholder={this.state.slogan}>
      </TextInput>
      <Button title='Save' onPress={() => this.saveSlogan()}></Button>
      </div>

  }

  saveSlogan() {
    httppost('/slogans/add', {slogan: this.state.slogan})
      .then(res => {
        console.log(res)
      })
      .catch(err => {console.log(err)})
  }
}

export default NewSlogan;
