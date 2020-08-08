import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableHeader } from '../table/table-header';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss']
})
export class FormViewComponent implements OnInit {
  @Input() title: string;
  @Input() form: any;
  @Input() headers: TableHeader[];
  @Input() editButton: boolean;
  @Input() deleteButton: boolean;
  @Input() buttons: boolean;
  @Input() action: any;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() onaction = new EventEmitter<any>();
  @Input() btnLeft: any;
  @Input() back: any;
  @Output() backClick = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    console.log('form: ', this.form);
    console.log('headers: ', this.headers);
  }

  onedit() {
    this.edit.emit(this.form);
  }

   ondelete() {
     swal({
         title: 'Are you sure?',
       text: 'This ' + this.title + ' will be deleted',
       type: 'warning',
         showCancelButton:true,
       confirmButtonColor:  '#3085d6',
         cancelButtonColor: 'Yes, delete it!'
       
     }).then((result) => {
       if (result.value) this.delete.emit(this.form);
     });
   }


  oncustomBtn(event){
    console.log(event);  
    console.log(event.name );    
    this.form.buttonName = event.name;
    this.onaction.emit(this.form);
  }

  onBack() {
    this.backClick.emit();
  }

}
