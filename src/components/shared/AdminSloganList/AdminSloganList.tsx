import React, { useContext, useEffect, useState } from 'react';
import Slogan from '../../../models/Slogan';
import { httpget, httppost } from '../../../services/backend';
import SharedContext from '../../../services/context-store';
import styles from './AdminSloganList.module.css';

const AdminSloganList: React.FC<any> = () => {
  const ctx = useContext(SharedContext);
  const [sloganList, setSloganList] = useState(new Array<Slogan>());

  useEffect( () => {
    httpget('/slogans').then(res => {
      if (res) {
        console.log(res);
        setSloganList(res.data);
      }
    });
  }, []);

  return (
    ctx.isAdmin?
    <div className={styles.AdminSloganList}>
      {
        sloganList.map((slogan: Slogan) => (
          <label key={slogan.slogan_id} className={styles.adminSlogansLabel}>
            <span >Slogan: </span>
            <input key={slogan.slogan_id} type="text" 
              defaultValue={slogan.name} 
              className={styles.slogan}
              onChange={(e) => changeSlogan(slogan, e.target.value)}/>
            <button onClick={() => updateSlogan(slogan)}>Update</button>
            <button onClick={() => deleteSlogan(slogan)}>Delete</button>
          </label>
        ))
      }
    </div>
    : <div>You are not allowed here!</div>
  );

  function updateSlogan(slogan: Slogan) {
    if (window.confirm(`Are you sure you want to update the slogan "${slogan.name}"?`)) {
      httppost('/slogan/update', {slogan: slogan} )
        .then( (res) => {ctx.showInfo("Slogan updated!"); setSloganList(res.data);})
        .catch( (err:any) => {ctx.handleErrors(err); });
    }
  }

  function deleteSlogan(slogan: Slogan) {
    if (window.confirm(`Are you sure you want to delete the slogan "${slogan.name}"?`)) {
      httppost('/slogan/delete', {slogan_id: slogan.slogan_id} )
        .then( (res) => {ctx.showInfo("Slogan deleted!"); setSloganList(res.data);})
        .catch( (err:any) => {ctx.handleErrors(err); });
    }
  }

  function changeSlogan(slogan: Slogan, value: string) {
    let slogans: Array<Slogan> = new Array<Slogan>();
    slogans = JSON.parse(JSON.stringify(sloganList));
    slogans.forEach(s => {
      if (s.slogan_id === slogan.slogan_id) {
        s.name = value;
      }
    });
    setSloganList(slogans);
  }
};

export default AdminSloganList;
