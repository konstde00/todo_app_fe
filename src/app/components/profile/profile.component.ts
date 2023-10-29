import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {StorageService} from "@app/src/app/services/storage.service";
import {environment} from "@app/src/environments/environment";
declare var handleSignout: any;

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {

  user: any;
  token: string;
  name: string;
  formattedRoles: string[];
  photoUrl: string;

  profileForm: FormGroup;
  fileForm: FormGroup;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private storageService: StorageService,
    private fb: FormBuilder
  ) {
    // @ts-ignore
    this.user = storageService.getUser();
    this.token = this.user.token;
    this.name = this.user.firstName + " " + this.user.lastName;
    this.formattedRoles = [];
    this.photoUrl = this.user.imageUrl == null ? this.user.picture : this.user.imageUrl;

    this.profileForm = this.fb.group({
      name: [this.user.firstName]
    });

    this.fileForm = this.fb.group({
      file: ['']
    });
  }

  ngOnInit() {
    this.user = this.storageService.getUser();
  }

  handleNameChange() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    // @ts-ignore
    const newName = this.profileForm.get('name').value;

    this.http
      .patch(`${environment.apiHost}/api/users/v1?name=${newName}`, {}, { headers })
      .subscribe(
        () => {
          this.user.name = newName;
          this.storageService.saveUser(this.user);
          this.toastr.success('Name updated successfully', '', {
            positionClass: 'toast-bottom-right'
          });
        },
        (error) => {
          this.toastr.error('An error occurred while updating the name', '', {
            positionClass: 'toast-bottom-right'
          });
        }
      );
  }

  fileName = '';

  onFileSelected(event: { target: { files: File[]; }; }) {

    const file:File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("photo", file);

      this.http .post(`${environment.apiHost}/api/users/v1/upload`, formData)
        .subscribe(
        (res) => {
          //@ts-ignore
          const imageUrl = res.imageUrl;

          this.toastr.success('Upload completed successfully', '', {
            positionClass: 'toast-bottom-right'
          });

          this.storageService.updateImageUrl(imageUrl);
          this.photoUrl = imageUrl;
        },
        (error) => {
          const errorMessage = JSON.parse(JSON.parse(error.error)).message;
          this.toastr.error(errorMessage, '', {
            positionClass: 'toast-bottom-right'
          });
        }
      );
    }
  }
}
