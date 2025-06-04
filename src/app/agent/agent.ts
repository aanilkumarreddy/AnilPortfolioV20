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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MarkdownModule } from 'ngx-markdown';

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
    MatTooltipModule,
    MarkdownModule,
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
    { role: 'ai', content: "Hi, I'm Anil's Assistant." },
    { role: 'ai', content: 'How can I help you today?' },
    {
      role: 'ai',
      content: "You can ask me about Anil's work, education, or anything else.",
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
      {
        role: 'typing',
        content: '',
      },
    ]);
    this.userInput.patchValue('');
    this.scrollToBottom();
    const response = await this.agentService.processMessage(userMessage);
    this.messages.update((messages) => {
      const filteredMessages = messages.filter((m) => m.role !== 'typing');
      return [...filteredMessages, { role: 'ai', content: response }];
    });

    this.scrollToBottom();
  }
}
