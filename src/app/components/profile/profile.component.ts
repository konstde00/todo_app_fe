import { Component, OnInit } from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
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
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("auth"));
    this.token = this.user.token;
    this.name = this.user.firstName + " " + this.user.lastName;
    this.formattedRoles = [];
    this.photoUrl = this.user.photoUrl;

    this.profileForm = this.fb.group({
      name: [this.user.name]
    });

    this.fileForm = this.fb.group({
      file: ['']
    });
  }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem("auth") || "");
  }

  handleSignOut() {
    handleSignout();
    sessionStorage.removeItem("auth");
    this.router.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }

  handleNameChange() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    // @ts-ignore
    const newName = this.profileForm.get('name').value;

    this.http
      .patch(`http://localhost:8080/api/users/v1?name=${newName}`, {}, { headers })
      .subscribe(
        () => {
          this.user.name = newName;
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

  uploadFile() {
    const formData = new FormData();
    // @ts-ignore
    formData.append('photo', this.fileForm.get('file').value);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    this.http
      .post('http://localhost:8080/api/users/v1/upload', formData, { headers })
      .subscribe(
        () => {
          this.toastr.success('Upload completed successfully', '', {
            positionClass: 'toast-bottom-right'
          });
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
