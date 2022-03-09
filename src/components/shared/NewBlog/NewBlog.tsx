import React from 'react';
import { TextInput, Button } from 'react-native';
import BlogModel from '../../../models/Blog';
import Category from '../../../models/Category';
import { httpget, httppost } from '../../../services/backend';
import SharedContext from '../../../services/context-store';
import styles from './NewBlog.module.css';

class NewBlog extends React.Component<any, any>  {
  imageFile: any;
  state = {
    title: 'Enter title',
    categories: Array<Category>(),
    content: 'Enter content',
    description: 'Enter short description',
  }

  componentDidMount() {
    httpget('/categories').then((res:any) => {
      if (res) {
        console.log(res.data)
        this.setState({categories: res.data});
      }
    })
    .catch(err => {
      this.context.handleErrors(err);
    });
  }

  render() {
    return (
      this.context.isAdmin ?
        <div className={styles.newBlog}>
          <TextInput style={{borderColor: 'black', borderWidth: 1, margin: '.5em', width: '100%'}}
            onChangeText={text => this.setState({title: text})}
            placeholder={this.state.title}>
          </TextInput>
          
          <div className={styles.cbCategory}>
            {
              this.state.categories.map((c:Category) => 
                <div key={c.category_id} style={{display: 'flex', flexDirection: 'row'}}>
                  <label htmlFor={c.category_id+''}>{c.name}</label><br></br>
                  <input type="checkbox" onChange={() => {c.checked = !c.checked;}} id={c.category_id+''} name={c.name} value="checkbox"/>
                </div>
              )
            }
          </div>

          <TextInput style={{borderColor: 'black', borderWidth: 1, margin: '.5em', width: '100%'}}
            onChangeText={text => this.setState({content: text})}
            multiline 
            numberOfLines={15}
            placeholder={this.state.content}>
          </TextInput>

          <TextInput style={{borderColor: 'black', borderWidth: 1, margin: '.5em', width: '100%'}}
            onChangeText={text => this.setState({description: text})}
            placeholder={this.state.description}>
          </TextInput>

          <input id={styles.imageFile} type="file" name="image" onChange={(e) => this.loadImage(e)}/>
          <Button title='Save' onPress={() => this.saveBlog()}></Button>
        </div>
      : <div>You are not allowed here!</div>
    )
  }

  changeState(c: any) {
    let tmp = c;
    tmp.checked = !c.checked;
    this.setState({c: tmp});
  }

  saveBlog() {
    let blog: BlogModel = new BlogModel();
    blog.title = this.state.title;
    blog.content = this.state.content;
    blog.description = this.state.description;
    blog.categories = this.state.categories.filter(category => {return category.checked === true;});

    console.log(blog);

    httppost('/blog/add', {blog: blog})
      .then(res => {
        if (res) {
          console.log(res)
          let id = res.data;
          const formData = new FormData();
          formData.append('image', this.imageFile);
          console.log(this.imageFile)
          console.log(formData)
          httppost('/blog/image', formData, {blogId: id})
            .then(res => { this.context.showInfo(res.data);})
            .catch(err => {this.context.handleErrors(err);})
        }

      }).catch(err => {this.context.handleErrors(err);});

  }

  loadImage(event: any) {
    this.imageFile = event.target.files[0];
  }
}
NewBlog.contextType = SharedContext;
export default NewBlog;