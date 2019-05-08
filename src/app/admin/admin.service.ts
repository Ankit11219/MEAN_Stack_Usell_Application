import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from './adminCat.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class AdminService {
  private posts: Category[] = [];
  private postsUpdated = new Subject<{ posts: Category[]; postCount: number }>();
  private posts1: Category[] = [];
  private postsUpdated1 = new Subject<{ posts: Category[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getCategories(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/admin/categories' + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getCategoryUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getCategory(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      imagePath: string;
      creator: string;
    }>('http://localhost:3000/api/admin/categories/' + id);
  }

  addCategory(title: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Category }>(
        'http://localhost:3000/api/admin/categories',
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateCategory(id: string, title: string, image: File | string) {
    let postData: Category | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put('http://localhost:3000/api/admin/categories/' + id, postData)
      .subscribe(response => {
        this.router.navigate(['/admin/list']);
      });
  }

  deleteCategory(categoryId: string) {
    return this.http.delete('http://localhost:3000/api/admin/categories/' + categoryId);
  }


  getSubCategories(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        'http://localhost:3000/api/admin/subcategories' + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts1 = transformedPostData.posts;
        this.postsUpdated1.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getSubCategoryUpdateListener() {
    return this.postsUpdated1.asObservable();
  }

  getSubCategory(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      imagePath: string;
      creator: string;
    }>('http://localhost:3000/api/admin/subcategories/' + id);
  }

  addSubCategory(title: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('image', image, title);
    this.http
      .post<{ message: string; post: Category }>(
        'http://localhost:3000/api/admin/subcategories',
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  updateSubCategory(id: string, title: string, image: File | string) {
    let postData: Category | FormData;
    if (typeof image === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        imagePath: image,
        creator: null
      };
    }
    this.http
      .put('http://localhost:3000/api/admin/subcategories/' + id, postData)
      .subscribe(response => {
        this.router.navigate(['/admin/sublist']);
      });
  }

  deleteSubCategory(categoryId: string) {
    return this.http.delete('http://localhost:3000/api/admin/subcategories/' + categoryId);
  }

}
