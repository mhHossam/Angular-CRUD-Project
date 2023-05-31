import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: [  ]
})
export class UserPageComponent implements OnInit {
  userId: any ;
  albumId:any;
  user: any;
  albums: any;
  photos : any ;


  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

ngOnInit() {
      // to get user id of any user
    this.userId= this.route.snapshot.params["userId"];
    console.log(this.userId);


      // to get album id of any user

    this.albumId= this.route.snapshot.params["albumId"];
    console.log(this.albumId);

    this.getUser();
    this.getAlbums();
    };

      /// to get information of any user by id
getUser()
{
    this.apiService.getUserById(this.userId).subscribe(
      {
        next:(data)=>{ this.user = data},
        error:(err)=>{console.log(err) }
      }
    )
    }

// get album of any user by id
getAlbums()
 {
    this.apiService.getAlbumsByUserId(this.userId).subscribe({
      next: (data) => {
      this.albums = data;
      },
      error: (err) => {
        console.log(err);
      },
  })
}



}
