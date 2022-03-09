import React, { useContext, useState } from 'react';
import { Button, TextInput } from 'react-native';
import { httppost } from '../../../services/backend';
import SharedContext from '../../../services/context-store';
import styles from './NewSlogan.module.css';
import Picker from 'emoji-picker-react';


// class NewSlogan extends React.Component<any> {
const NewSlogan: React.FC<any> = () => {
  const ctx = useContext(SharedContext);
  const [slogan, setSlogan] = useState('');
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event:any, emojiObject:any) => {
    setChosenEmoji(emojiObject);
    let el = document.activeElement as HTMLInputElement;
    el.value += emojiObject.emoji;
  };

  return (
    ctx.isAdmin ?
      <div className={styles.slogan}>
        <span>New slogan</span>
        <input id={styles.adminNewSlogan} type="text" onChange={ (e) => setSlogan(e.target.value)}/>
        <div className={styles.emojiPicker} onMouseDown={(e) => {e.preventDefault()}}>
          <Picker pickerStyle={{width: '100%'}} onEmojiClick={onEmojiClick} />
        </div>
        <Button title='Save' onPress={() => saveSlogan()}></Button>
      </div>
    : <div>You are not allowed here!</div>
  );

  function saveSlogan() {
    if (slogan.length > 0) {
      httppost('/slogan/add', {slogan: slogan})
      .then(res => { if(res.data) ctx.showInfo(res.data);})
      .catch(err => {ctx.handleErrors(err)});
    } else {
      ctx.handleErrors({message: "Empty value for new slogan!"});
    }
  }
}
export default NewSlogan;
