import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';
import { AddsubcategoryComponent } from './admin/addsubcategory/addsubcategory.component';
import { ManagePostComponent } from './admin/manage-post/manage-post.component';
import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { AdminGuard } from './admin/admin.guard';
import { AdminListComponent } from './admin/admin-list/admin-list.component';
import { AllPostListComponent } from './admin/all-post-list/all-post-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'admin/list', component: AdminListComponent, canActivate: [AdminGuard] },
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'createCategory', component: AddcategoryComponent, canActivate: [AdminGuard] },
  { path: 'editCat/:postId', component: AddcategoryComponent, canActivate: [AdminGuard] },
  { path: 'createSubCategory', component: AddsubcategoryComponent, canActivate: [AdminGuard] },
  { path: 'admin/managePost', component: ManagePostComponent, canActivate: [AdminGuard] },
  { path: 'admin/manageUser', component: ManageUserComponent, canActivate: [AdminGuard] },
  { path: 'admin/allposts', component: AllPostListComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule {}
