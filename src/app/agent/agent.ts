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
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  userInput = new FormControl('', [Validators.required]);
  isChatOpen: boolean = false;

  recognition: any;
  isListening = false;

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
    if (!userMessage || userMessage.trim() === '') {
      return;
    }
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

  startSpeech() {
    // Check for browser support
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      return;
    }

    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      this.userInput.patchValue(transcript);
      this.isListening = false;
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
    };

    this.recognition.onend = () => {
      this.isListening = false;
    };

    this.isListening = true;
    this.recognition.start();
  }

  stopSpeech() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }
}
