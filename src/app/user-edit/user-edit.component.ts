import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { Location } from '@angular/common';
import { MessageService } from '../messages.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  constructor(private messages: MessageService, private route: ActivatedRoute, private service: UserService, private location: Location) {
  }
  currentUser: User = {
    createdAt: null,
    deletedAt: null,
    email: '',
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
    workTime: {
      startTime: "08:00:00",
      endTime: "08:00:00",
      weekDays: [1, 2, 3, 4, 5]
    }
  };
  selectedSkills = [];
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  selectedSkillsformControl = new FormControl(this.selectedSkills, [Validators.required]);
  roleOptions = [
    { name: 'Admin', value: 'Admin', checked: false },
    { name: 'Power user', value: 'PowerUser', checked: false },
    { name: 'Patient', value: 'Patient', checked: false },
    { name: 'Doctor', value: 'Doctor', checked: false },
    { name: 'BMA', value: 'BmaSkill', checked: false },
  ];
  skillOptions = [
    { name: 'EB', value: 'EB', checked: false },
    { name: 'ES', value: 'ES', checked: false },
    { name: 'BP', value: 'BP', checked: false },
    { name: 'HO', value: 'HO', checked: false },
    { name: 'SP', value: 'SP', checked: false },
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
    this.selectedRoles = this.roleOptions.map((role) => role.checked && role.value).filter(item => !!item)

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
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }

    return formControl.hasError('email') ? 'Not a valid email' : '';
  }
}
