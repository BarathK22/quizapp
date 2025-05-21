import { Component } from '@angular/core';
import { QuestionComponent } from './components/question/question.component';
import { NewPollComponent } from './components/new-poll/new-poll.component';
import { ResultsComponent } from './components/results/results.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, QuestionComponent, NewPollComponent, ResultsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  polls: { question: string; options: string[]; correctAnswer?: string }[] = [];


  loadPolls() {
    const stored = localStorage.getItem('polls');
    this.polls = stored ? JSON.parse(stored) : [];
  }

  deletePoll(index: number) {
    const poll = this.polls[index];

    this.polls.splice(index, 1);
    localStorage.setItem('polls', JSON.stringify(this.polls));

    
    const key = `votes_${poll.question}`;
    localStorage.removeItem(key);
    localStorage.removeItem(`${key}_voted`);
  }
  pointsGood = 0;
  pointsBad = 0;

ngOnInit() {
  this.loadPolls();

  this.pointsGood = Number(localStorage.getItem('points_good') || '0');
  this.pointsBad = Number(localStorage.getItem('points_bad') || '0');
}
updatePoints() {
  this.pointsGood = Number(localStorage.getItem('points_good') || '0');
  this.pointsBad = Number(localStorage.getItem('points_bad') || '0');
}
resetPoints() {
  localStorage.removeItem('points_good');
  localStorage.removeItem('points_bad');
  this.pointsGood = 0;
  this.pointsBad = 0;
}



}
