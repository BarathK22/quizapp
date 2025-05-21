import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  @Input() question: string = '';
  @Input() options: string[] = [];

  votes: Record<string, number> = {};

  ngOnInit(): void {
    this.loadVotes();
  }

  loadVotes() {
    const key = `votes_${this.question}`;
    const storedVotes = localStorage.getItem(key);
    this.votes = storedVotes ? JSON.parse(storedVotes) : {};
  }
}
