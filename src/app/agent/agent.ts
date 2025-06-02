import {
  AfterViewChecked,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';
import { AgentService } from '../services/agentic-service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-agent',
  imports: [
    MatIcon,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './agent.html',
  styleUrl: './agent.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class Agent implements AfterViewChecked {
  messages = signal<any[]>([
    { role: 'ai', content: 'You are a helpful AI assistant.' },
    { role: 'user', content: 'Hello! How can you assist me today?' },
    {
      role: 'ai',
      content:
        'Hi there  ! I can help you with information about my portfolio, including education, work experience, projects, and more. What would you like to know?',
    },
    { role: 'user', content: 'Can you tell me about your education?' },
    {
      role: 'ai',
      content:
        'Sure! I have a degree in Computer Science from XYZ University, where I specialized in software development and AI.',
    },
    { role: 'user', content: 'What projects have you worked on?' },
    {
      role: 'ai',
      content:
        'I have worked on several projects, including a web application for task management, a mobile app for fitness tracking, and an AI-powered chatbot for customer support.',
    },
  ]);
  userInput = new FormControl('');
  isChatOpen: boolean = false;

  @ViewChild('chatHistory') chatHistory!: ElementRef;

  constructor(private agentService: AgentService) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.chatHistory) {
      setTimeout(() => {
        const element = this.chatHistory.nativeElement;
        element.scrollTop = element.scrollHeight;
      }, 0);
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  async sendMessage() {
    const userMessage = this.userInput.value ?? '';
    // this.messages.push(`You: ${userMessage}`);
    this.messages.update((messages) => [
      ...messages,
      { role: 'user', content: userMessage },
    ]);
    this.userInput.patchValue('');
    this.scrollToBottom();
    const response = await this.agentService.processMessage(userMessage);
    this.messages.update((messages) => [
      ...messages,
      { role: 'ai', content: response },
    ]);

    this.scrollToBottom();
  }
}
