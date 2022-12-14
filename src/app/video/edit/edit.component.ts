import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null; 
  @Output() update = new EventEmitter()
  alertField = false;
  inSubmission = false
  alertColor = 'blue';
  alertMsg = 'Please wait! Updating clip.';


  clipID = new FormControl('', {
    nonNullable: true
  }) 

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  editForm: FormGroup = new FormGroup({
    title: this.title,
    id: this.clipID
  })

  constructor(
    private modal: ModalService,
    private clipService: ClipService,
    private snackBar: MatSnackBar
  
  ) { }

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(): void {
      this.modal.unregister('editClip')
  }

  ngOnChanges(): void {
    if (!this.activeClip) {
        return
    }
    
    this.inSubmission = false;
    this.alertField = false; 
    this.clipID.setValue(this.activeClip.docID as string)
    this.title.setValue(this.activeClip.title)
  }

  async submit() {
    if (!this.activeClip) {
      return
    }

    this.inSubmission = true;
    this.alertField = true; 
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';
    this.snackBar.open(this.alertMsg, 'X', {duration: 2000})

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    } 
    catch (e) {
      this.inSubmission = false;
      this.alertColor = 'red'; 
      this.alertMsg = 'Something went wrong. Try again later. '

      this.snackBar.open(this.alertMsg, 'X', { duration: 2000 })
      return
    }

    this.activeClip.title = this.title.value 
    this.update.emit(this.activeClip)

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!';

    this.snackBar.open(this.alertMsg, 'X', { duration: 2000 })
  }  
}
