import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent {
  @Output() pollCreated = new EventEmitter<void>();

  questionText = '';
  optionsText = '';
  correctAnswer = '';
  success = false;

  savePoll() {
    if (!this.questionText || !this.optionsText) return;

    const poll = {
      question: this.questionText,
      options: this.optionsText.split(',').map(o => o.trim()),
      correctAnswer: this.correctAnswer.trim()
    };

    const existingPolls = JSON.parse(localStorage.getItem('polls') || '[]');
    existingPolls.push(poll);
    localStorage.setItem('polls', JSON.stringify(existingPolls));

    this.success = true;
    this.questionText = '';
    this.optionsText = '';
    this.correctAnswer = '';

    this.pollCreated.emit();
  }
}
