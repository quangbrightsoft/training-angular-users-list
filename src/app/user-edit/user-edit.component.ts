import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Location } from '@angular/common';
import { MessageService } from '../messages.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(private messages: MessageService, private route: ActivatedRoute, private service: UserService, private location: Location) {
  }
  currentUser: User = new User();
  roleOptions = [
    { name: 'Admin', value: 'Admin', checked: false },
    { name: 'Power user', value: 'PowerUser', checked: false },
    { name: 'Patient', value: 'Patient', checked: false },
    { name: 'Doctor', value: 'Doctor', checked: false },
    { name: 'BMA', value: 'BmaSkill', checked: false },
  ];
  selectedRoles = [];
  ngOnInit(): void {
    this.route.params.subscribe(p => this.getUser(p && p['id']));
  }
  save() {
    this.createUser();
  }
  cancel() {
    this.location.back();
  }
  checkboxChanged() {
    this.selectedRoles = this.roleOptions.map((role) => role.checked && role.value).filter(item=>!!item)

  }
  private createUser() {
    this.currentUser.roles = this.selectedRoles;
    this.service.createUser(this.currentUser).subscribe(user => {
      this.messages.add('Created successfully')
    }, (error) => {
      this.messages.add('Failed' + error.error)

    });
  }
  private getUser(id: string): void {
    if (!id) {
      this.currentUser = {
        createdAt: null,
        deletedAt: null,
        email: 'empty',
        fullName: '',
        id: 0,
        isDeleted: false,
        isDisabled: false,
        leaves: [],
        medicalNote: '',
        personalId: '',
        roles: [],
        sex: '',
        skillIds: [],
        skills: [],
        ssn: '',
        updatedAt: null,
        userName: null,
      };
      return;
    }

  }
}
