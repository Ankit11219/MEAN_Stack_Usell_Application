import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { mimeType } from '../../posts/post-create/mime-type.validator';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../admin.service';
import { Category } from '../adminCat.model';
@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit, OnDestroy {
  enteredTitle = '';
  form: FormGroup;
  post: Category;
  imagePreview: string | any;
  isLoading = false;
  private postId: string;
  private mode = 'createSubCategory';
  private authStatusSub: Subscription;

  constructor( public adminService: AdminService, public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'editSubCat';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.adminService.getSubCategory(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.form.setValue({
            title: this.post.title,
            image: this.post.imagePath,
          });
        });
      } else {
        this.mode = 'createSubCategory';
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveCategory() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'createSubCategory') {
      this.adminService.addSubCategory(
        this.form.value.title,
        this.form.value.image,
      );
    } else {
      this.adminService.updateSubCategory(
        this.postId,
        this.form.value.title,
        this.form.value.image,
      );
    }
    this.form.reset();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
