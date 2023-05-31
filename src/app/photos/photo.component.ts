import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: [ ]
})
export class PhotoComponent implements OnInit {
  userId : any;
  albumId: any;
  photos:any;
  albums: any;
  user: any;



  constructor(private route: ActivatedRoute, private apiService: ApiService) {



  }

ngOnInit() {
          // to get user id of any user
    this.userId= this.route.snapshot.params["userId"];
    console.log(this.userId);
          // to get  album id of any user
    this.albumId= this.route.snapshot.params["albumId"];
    console.log(this.albumId);

    this.getUser();
    this.getPhotos();
  }

    // Function to get user data

  getUser() {

    this.apiService.getUserById(this.userId).subscribe(
      {
        next:(data)=>{ this.user = data},
        error:(err)=>{console.log(err) }
      }
    )
    }


  // Function to get photos based on albumId

  getPhotos() {
    this.apiService.getPhotosByAlbumId(this.albumId).subscribe({
      next:(data)=>{ this.photos = data},
      error:(err)=>{console.log(err) }
    });
  }
}
