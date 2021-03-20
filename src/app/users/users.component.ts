import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from
    '@angular/forms';
import { User } from '../domain.ts/user';
import { userService } from '../service/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: User[];
    user = new User();

    submitted = false;
    // type MyArrayType = Array<{id: number, text: string}>;
    searchedKeyword: string;
    constructor(private _userService: userService, private formBuilder: FormBuilder) { }
    registrationForm: FormGroup;
    sortuser: [];

    getUsers(): void {
        this._userService.listAllUser()
            .subscribe((userData) => {
                this.users = userData,
                    console.log(userData)
            }, (error) => {
                console.log(error)

            });
    }


    ngOnInit() {
        this.registrationForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phno: ['', [Validators.required, Validators.maxLength(11)]],
            pincode: ['', [Validators.required, Validators.maxLength(6)]],
            joiningdate: ['', Validators.required],
            dob: ['', Validators.required],
            status: ['Active']
        }); 

        this.getUsers();
    }
    get fval() { return this.registrationForm.controls; }


    registerNewUser() {
        this.submitted = true;
        // console.log("register form here" + JSON.stringify(this.registrationForm));
        
        console.log("register form here" + this.user.status);
        // stop here if form is invalid
        // if (this.registrationForm.invalid) {
        //     return;
        // }
        // else{
            this.user.status = "Active";
        this._userService.registerUser(this.user)

            .subscribe((response) => {
                console.log(response);
                //this.reset();
                this.getUsers();
            }, (error) => {
                console.log(error);
            });
        // }

    }

    private reset() {

        this.user.uid = null;
        this.user.firstname = null;
        this.user.lastname = null;
        this.user.email = null;
        this.user.phno = null;
        this.user.pincode = null;
        this.user.joiningdate = null;
        this.user.dob = null;
        this.user.status = null;

    }
    deleteUser(uid: bigint) {
        this._userService.deleteUser(uid)
            .subscribe((response) => {
                console.log(response + "-----------------------");
                this.getUsers();
                /*  this.getEmployees(); */
            },
                (error) => {
                    console.log(error);
                }
            )
    }

    getUserbyid(uid: bigint) {
        return this._userService.getUserbyid(uid)
            .subscribe((userData) => {
                this.user = userData;
                this.getUsers();
            },
                (error) => {
                    console.log(error);
                })
    }
    getSortedDob() {
        console.log("in");
        return this._userService.getSortedDob().subscribe((response) => {
            console.log(response);
            var resp = JSON.stringify(response);
            this.users = JSON.parse(resp);
            // const arr: MyArrayType = [response];
            // this.sortuser = JSON.stringify(response);
        })
    }
    getSortedDoj() {
        console.log("in");
        return this._userService.getSortedDoj().subscribe((response) => {
            console.log(response);
            var resp = JSON.stringify(response);
            this.users = JSON.parse(resp);
            // const arr: MyArrayType = [response];
            // this.sortuser = JSON.stringify(response);
        })
    }
}


