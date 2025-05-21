import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question: string = '';
  @Input() options: string[] = [];

  votes: Record<string, number> = {};
  hasVoted = false;

  ngOnInit() {
    this.loadVotes();
  }
  @Output() scoreUpdated = new EventEmitter<void>();
 vote(option: string) {
  if (this.hasVoted) return;

  this.votes[option] = (this.votes[option] || 0) + 1;

  const key = this.getStorageKey();
  localStorage.setItem(key, JSON.stringify(this.votes));
  localStorage.setItem(`${key}_voted`, 'true');
  this.hasVoted = true;

  if (this.correctAnswer) {
  if (option === this.correctAnswer) {
    this.score = 'correct';
    const good = Number(localStorage.getItem('points_good') || '0') + 1;
    localStorage.setItem('points_good', good.toString());
  } else {
    this.score = 'incorrect';
    const bad = Number(localStorage.getItem('points_bad') || '0') + 1;
    localStorage.setItem('points_bad', bad.toString());
  }
  this.scoreUpdated.emit();

}

}


  loadVotes() {
    const key = this.getStorageKey();
    const storedVotes = localStorage.getItem(key);
    this.votes = storedVotes ? JSON.parse(storedVotes) : {};
    this.hasVoted = localStorage.getItem(`${key}_voted`) === 'true';
  }

  private getStorageKey(): string {
    return `votes_${this.question}`;
  }

  resetVotes() {
  const key = this.getStorageKey();
  localStorage.removeItem(key);
  localStorage.removeItem(`${key}_voted`);
  this.votes = {};
  this.hasVoted = false;
  }
  @Input() showReset: boolean = false;

  @Input() correctAnswer?: string;

score: 'correct' | 'incorrect' | null = null;
}


