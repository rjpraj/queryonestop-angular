import { Component, inject } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrls: ['./post-question.component.scss']
})
export class PostQuestionComponent {
  tags : any = [];
  isSubmitting!:boolean;
  addOnBlur = true;
  validateForm:any = FormGroup;

  readonly separatorKeysCodes = [ENTER,COMMA] as const;
  announcer = inject(LiveAnnouncer);

  add(event:MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our tags
    if(value){
      this.tags.push({ name: value });
    }

    event.chipInput!.clear();
  }

  remove(tag:any): void {
    const index = this.tags.indexOf(tag);
    if(index>=0){
      this.tags.splice(index,1);
      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag:any,event:MatChipEditedEvent){
    const value = event.value.trim();
    //Remove tag if it no longer has a name
    if (!value){
      this.remove(tag);
      return;
    }
    //Edit existing tag
    const index = this.tags.indexOf(tag);
    if(index>=0){
      this.tags[index].name=value;
    }
}

  constructor(private service:QuestionService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar){ }

  ngOnInit(){
    this.validateForm = this.fb.group({
      title : ['',Validators.required ],
      body : ['',Validators.required ],
      tags : ['',Validators.required ]
    })
  }
  postQuestion(){
    console.log(this.validateForm.value);
    this.service.postQuestion(this.validateForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id !=null){
        this.snackBar.open("Question posted successfully","Close",{duration :2000});
      }
      else{
        this.snackBar.open("Something went wrong","Close",{duration :2000});
      }
    })
  }

}
