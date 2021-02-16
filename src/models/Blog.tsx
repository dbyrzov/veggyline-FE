import Category from './Category'

export default class BlogModel {
    blog_id: number = -1;
    title: string = '';
    content: string = '';
    image: string = '';
    // blog_category_id: number = -1;
    categories: Array<Category> = Array<Category>();
    description: string = '';


    constructor() {
    }

    static BlogModelEmpty() {
        let blog = new BlogModel();
        blog.blog_id = -1;
        blog.title = '';
        blog.content = '';
        blog.image = '';
        blog.categories = [];
        blog.description = '';
        return blog; 
    }

}
