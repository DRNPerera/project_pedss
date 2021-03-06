import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EventService } from '../shared/event.service';
import { Event } from '../shared/event';
import { SubEventService } from '../shared/subevent.service';
import { SubEvent } from '../shared/subevent';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../users/shared/user';
import { UserService } from '../../users/shared/user.service';
import { TeamCard } from '../shared/teamcard';
import { TeamCardService } from '../shared/teamcard.service';


@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
  providers:[EventService,SubEventService,UserService,TeamCardService]
})
export class TeamCardComponent implements OnInit {

  
 
  userIndexList : string[];
  userList : User[];
  selectedTeamCard : TeamCard;
   faculties : string[]=["UCSC","Science","Arts","Management"];

  constructor(private tostr : ToastrService,private userService : UserService,private teamCardService : TeamCardService) { }

  ngOnInit() {

   
    this.refreshUserList();
    this.resetForm();
  	
  }



  addTeamCard(subevent : SubEvent ){


  }

  refreshUserList(){
    this.userService.getUserList().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }

   
  

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser={
      _id :null,
      name :"",
      regNo : ""  ,
      indexNo : "",
      password : "",
      nic : "" ,
      telephone : null ,
      email : "" ,
      positions:"",
      sport:"" ,
      faculty:""
  }
    
  }

  onSelect(user : User){
     this.userIndexList.push(user.indexNo as string);
     console.log(this.userIndexList);

  }
  

  onSubmit(form: NgForm) {
    if (form.value._id == null) {
      //this.userIndexList.push(form.value.indexNo as string);
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        
        this.tostr.success('Submitted Succcessfully', 'User Register');
      });
    }
    else {
      this.userService.putUser(form.value).subscribe((res) => {
        this.resetForm(form);
        
        this.tostr.success('Updated Succcessfully', 'User Register');
      });


    }
  }

  

  
  




}
