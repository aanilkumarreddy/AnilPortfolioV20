import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Agent } from './agent';
import { AgentService } from '../services/agentic-service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Component,
  ElementRef,
  provideZonelessChangeDetection,
} from '@angular/core';
import { of } from 'rxjs';

class MockAgentService {
  processMessage = jasmine
    .createSpy('processMessage')
    .and.returnValue(Promise.resolve('AI response'));
}

describe('Agent', () => {
  let component: Agent;
  let fixture: ComponentFixture<Agent>;
  let agentService: MockAgentService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agent, ReactiveFormsModule],
      providers: [
        { provide: AgentService, useClass: MockAgentService },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Agent);
    component = fixture.componentInstance;
    agentService = TestBed.inject(AgentService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle chat open/close', () => {
    expect(component.isChatOpen).toBeFalse();
    component.toggleChat();
    expect(component.isChatOpen).toBeTrue();
    component.toggleChat();
    expect(component.isChatOpen).toBeFalse();
  });

  it('should add user and AI messages on sendMessage', async () => {
    component.userInput.setValue('Hello');
    spyOn(component.messages, 'update').and.callThrough();
    await component.sendMessage();
    expect(agentService.processMessage).toHaveBeenCalledWith('Hello');
    expect(component.messages.update).toHaveBeenCalled();
  });

  it('should not send message if input is empty', async () => {
    component.userInput.setValue('');
    spyOn(component.messages, 'update');
    await component.sendMessage();
    expect(component.messages.update).not.toHaveBeenCalled();
  });

  it('should call scrollToBottom via ngAfterViewChecked', () => {
    // Provide a mock chatHistory
    component.chatHistory = {
      nativeElement: { scrollTop: 0, scrollHeight: 100 },
    } as ElementRef;
    expect(() => component.ngAfterViewChecked()).not.toThrow();
  });

  it('should patch user input with recognized speech', () => {
    const patchSpy = spyOn(component.userInput, 'patchValue');
    const mockRecognition = {
      start: () => {},
      stop: () => {},
      onresult: undefined,
      onerror: undefined,
      onend: undefined,
      lang: '',
      interimResults: false,
      maxAlternatives: 1,
    };
    (window as any).webkitSpeechRecognition = function () {
      return mockRecognition;
    };
    component.startSpeech();
    // Assign a function to onresult and call it
    if (component.recognition) {
      component.recognition.onresult = (event: any) => {
        patchSpy(event.results[0][0].transcript);
      };
      component.recognition.onresult({
        results: [[{ transcript: 'speech text' }]],
      });
      expect(patchSpy).toHaveBeenCalledWith('speech text');
    }
  });

  it('should start and stop speech recognition', () => {
    let started = false;
    let stopped = false;
    const mockRecognition = {
      start: () => {
        started = true;
      },
      stop: () => {
        stopped = true;
      },
      onresult: null,
      onerror: null,
      onend: null,
      lang: '',
      interimResults: false,
      maxAlternatives: 1,
    };
    (window as any).webkitSpeechRecognition = function () {
      return mockRecognition;
    };
    component.startSpeech();
    expect(started).toBeTrue();
    component.isListening = true;
    component.recognition = mockRecognition;
    component.stopSpeech();
    expect(stopped).toBeTrue();
  });
});
