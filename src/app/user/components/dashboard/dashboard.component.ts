import { Component, numberAttribute } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  questions: any[] = [];
  pageNum: number = 0;
  total!: number;

  constructor(private service: QuestionService){}

  ngOnInit(){
    this.getAllQuestion(); // once the compment is called first time 
  }  

  getAllQuestion(){
    this.service.getAllQuestion(this.pageNum).subscribe((res:any)=> {
    console.log(res);
    this.questions = res.questionDtoList;
    this.total = res.totalPages*5;
  })
  }

  pageIndexChange(event:any){
    this.pageNum=event.pageIndex;
    this.getAllQuestion();

  }

}
