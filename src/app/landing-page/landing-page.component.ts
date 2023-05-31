import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-landing-page',
  templateUrl:'./landing-page.component.html',
  styles: [

  ]
})
export class LandingPageComponent implements OnInit {
  userForm : FormGroup  ;
  selectedUser : any;
  userId:any;
  users: any;
  displayedColumns: string[] = ['select', 'name', 'email', 'number', 'address', 'action'];


  @ViewChild('modalContent') modalContent: any;

  constructor(private route: ActivatedRoute,private apiService: ApiService ,
    private modalService: NgbModal , private formBuilder: FormBuilder )

    {
/// use formbuilder here for making validation
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email , Validators.pattern('\\w+@\\w+\\.\\w+')]],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      suite: ['', Validators.required],
      city: ['', Validators.required]
    });

      // to get user id of any user

    this.userId= this.route.snapshot.params["userId"];
    console.log(this.userId);


  }





  ngOnInit() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.log(err);
      },
  })
  }



  // Function to delete a user

  delete(id: any) {
    if (confirm('Are you want to delete this User?')) {
      this.apiService.DeleteUser(id).subscribe({
        next: (data) => {
          this.users = this.users.filter((data:any) => data.id != id);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }



  // Function to open the modal to add user
  openModal() {
    const modalRef = this.modalService.open(this.modalContent);
    console.log( modalRef);
    modalRef.result.then(
      (result) => {
          // Handle modal close (form submission)
      if (result === 'save') {

          // Call function to add user

          this.addUser();
      }
    },
    (reason) => {
      // Handle modal dismissal

      this.userForm.reset();
    }
  );
}

  // Function to add a user
  addUser() {

    const newUser =  {
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      address: {
        street: this.userForm.value.street,
        suite:this.userForm.value.suite,
        city: this.userForm.value.city
      }

    };
      /// send new user to api
    this.apiService.createUser(newUser).subscribe({
        next: (data) => {
          console.log(data);
          // Add the newly created user to the table
          this.users.push(newUser);
          this.userForm.reset();
        },
        error: (err) => {
          console.log(err);
        }
      });

  }

    // Function to open the modal to edit user

  editUser(user: any) {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      street: user.address.street,
      suite: user.address.suite,
      city: user.address.city
    });

    const modalRef = this.modalService.open(this.modalContent);
    modalRef.result.then(
      (result) => {
        // Handle modal close (form submission)
        if (result === 'save') {
          // Call the updateUser method with the user object
          this.updateUser(user);
          this.userForm.reset();
        }
      },
      (reason) => {
        // Handle modal dismissal
        this.userForm.reset();
      }
    );
  }

    // Function to update a user

  updateUser(user: any) {
    // Update the user object with the new values
    user.name = this.userForm.value.name;
    user.email = this.userForm.value.email;
    user.phone = this.userForm.value.phone;
    user.address.street = this.userForm.value.street;
    user.address.suite = this.userForm.value.suite;
    user.address.city = this.userForm.value.city;

    // Call the updateUser method from the ApiService
    this.apiService.updateUser(user.id, user).subscribe({
      next: (data) => {
        console.log(data);
        // Update the user in the table by finding its index in the users array
        const index = this.users.findIndex((u: any) => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


};











