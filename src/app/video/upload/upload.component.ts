import { Component, OnDestroy} from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { last, switchMap } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  isDragover = false;
  isUpload = false;
  file: File | null = null;
  alertField = false;
  alertMsg = 'Please wait! Your clip is being uploaded. ';
  alertColor = 'blue';
  inSubmission = false;
  percentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;
  task?: AngularFireUploadTask;

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  upploadForm: FormGroup = new FormGroup({
    title: this.title
  })

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipsService: ClipService,
    private router: Router
  ) { 
    auth.user.subscribe(user => this.user = user)
  }

  ngOnDestroy(): void {
      this.task?.cancel()
  }

  storeFile($event: Event) {

    this.isDragover = false;

    this.file = ($event as DragEvent).dataTransfer ?
      ($event as DragEvent).dataTransfer?.files.item(0) ?? null :
      ($event.target as HTMLInputElement).files?.item(0) ?? null

    if (!this.file || this.file.type !== 'video/mp4') {
      return
    }
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.isUpload = true;

    console.log(this.file)

  }

  uploadFile() {
    this.upploadForm.disable()
    this.alertField = true; 
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uploaded. ';
    this.inSubmission = true;
    this.showPercentage = true;
   
    const clipFileName = uuid()
    const clipPath = `clips/${clipFileName}.mp4`

    this.task = this.storage.upload(clipPath, this.file);
    const clipRef = this.storage.ref(clipPath);

    this.task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100
    })

    this.task.snapshotChanges().pipe(
      last(),
      switchMap(() => clipRef.getDownloadURL())
    ).subscribe({
      next: async (url) => {
        const clip = {
          uid: this.user?.uid as string,
          displayName: this.user?.displayName as string,
          title: this.title.value,
          fileName: `${clipFileName}.mp4`,          
          url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }

        const clipDocRef = await this.clipsService.createClip(clip)

        console.log(clip)
        this.alertColor = 'green'
        this.alertMsg = 'Success! Your clip is now ready to share with the world.';
        this.showPercentage = false;

        setTimeout(() => {
          this.router.navigate([
            'clip', clipDocRef.id
          ])
        }, 1000)
      },
      error: (error) => {
        this.upploadForm.enable()
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed! Please try again later.';
        this.inSubmission = true; 
        this.showPercentage = false;
        console.log(error.code);
      }
    });
    
    
  }

}
