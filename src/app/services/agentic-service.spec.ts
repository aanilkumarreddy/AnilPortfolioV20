import { TestBed } from '@angular/core/testing';
import { AgentService } from './agentic-service';
import { DataService } from './data';
import { FirebaseApp } from '@angular/fire/app';
import { of } from 'rxjs';
import { provideZonelessChangeDetection } from '@angular/core';
import * as vertexai from '@angular/fire/vertexai';
import { VertexAIWrapperService } from './vertexai-wrapper.service';

// Mocks for Vertex AI SDK
const mockChatSession = {
  sendMessage: jasmine.createSpy('sendMessage').and.returnValue(
    Promise.resolve({
      response: {
        functionCalls: () => [],
        text: () => 'response text',
      },
    })
  ),
};
const mockModel = {
  startChat: () => mockChatSession,
};
const mockVertexAI = {};

// Mock DataService
class MockDataService {
  getData = jasmine.createSpy('getData').and.callFake((path: string) => {
    switch (path) {
      case 'education':
        return of([{ degree: 'B.Tech' }]);
      case 'experience':
        return of([{ company: 'TestCorp' }]);
      case 'projects':
        return of([{ name: 'ProjectX' }]);
      case 'overrview':
        return of([{ name: 'Anil' }]);
      case 'contact':
        return of([{ email: 'anil@example.com' }]);
      case 'volunteering':
        return of([{ org: 'NGO' }]);
      case 'about':
        return of([{ description: 'About page' }]);
      default:
        return of([]);
    }
  });
}

// Mock FirebaseApp with getProvider
const firebaseAppMock = {
  getProvider: () => ({
    getImmediate: () => ({}),
  }),
};

// Mock VertexAIWrapperService
class MockVertexAIWrapperService {
  getAI = jasmine.createSpy().and.returnValue(mockVertexAI);
  getGenerativeModel = jasmine.createSpy().and.returnValue(mockModel);
}

describe('AgentService', () => {
  let service: AgentService;
  let dataService: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DataService, useClass: MockDataService },
        { provide: FirebaseApp, useValue: firebaseAppMock },
        {
          provide: VertexAIWrapperService,
          useClass: MockVertexAIWrapperService,
        },
        provideZonelessChangeDetection(),
      ],
    });
    // Reset the sendMessage spy to its default implementation for each test
    mockChatSession.sendMessage.calls.reset();
    mockChatSession.sendMessage.and.returnValue(
      Promise.resolve({
        response: {
          functionCalls: () => [],
          text: () => 'response text',
        },
      })
    );
    service = TestBed.inject(AgentService);
    dataService = TestBed.inject(DataService) as any;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getEducationTool and return education data', async () => {
    const result = await (service as any).getEducationTool();
    expect(dataService.getData).toHaveBeenCalledWith('education');
    expect(result).toEqual([{ degree: 'B.Tech' }]);
  });

  it('should call getWorkExperienceTool and return experience data', async () => {
    const result = await (service as any).getWorkExperienceTool();
    expect(dataService.getData).toHaveBeenCalledWith('experience');
    expect(result).toEqual([{ company: 'TestCorp' }]);
  });

  it('should call getProjectsTool and return projects data', async () => {
    const result = await (service as any).getProjectsTool();
    expect(dataService.getData).toHaveBeenCalledWith('projects');
    expect(result).toEqual([{ name: 'ProjectX' }]);
  });

  it('should call overview and return overview data', async () => {
    const result = await (service as any).overview();
    expect(dataService.getData).toHaveBeenCalledWith('overrview');
    expect(result).toEqual([{ name: 'Anil' }]);
  });

  it('should call contact and return contact data', async () => {
    const result = await (service as any).contact();
    expect(dataService.getData).toHaveBeenCalledWith('contact');
    expect(result).toEqual([{ email: 'anil@example.com' }]);
  });

  it('should call volunteering and return volunteering data', async () => {
    const result = await (service as any).volunteering();
    expect(dataService.getData).toHaveBeenCalledWith('volunteering');
    expect(result).toEqual([{ org: 'NGO' }]);
  });

  it('should call about and return about data', async () => {
    const result = await (service as any).about();
    expect(dataService.getData).toHaveBeenCalledWith('about');
    expect(result).toEqual([{ description: 'About page' }]);
  });

  it('should process a message and return response text', async () => {
    const response = await service.processMessage('Hello');
    expect(mockChatSession.sendMessage).toHaveBeenCalled();
    expect(response).toBe('response text');
  });

  it('should handle unknown function call in processMessage', async () => {
    // Patch sendMessage to simulate a function call
    let callCount = 0;
    mockChatSession.sendMessage.and.callFake(() => {
      callCount++;
      if (callCount === 1) {
        return Promise.resolve({
          response: {
            functionCalls: () => [{ name: 'unknownFunction' }],
            text: () => 'response text',
          },
        });
      } else {
        return Promise.resolve({
          response: {
            functionCalls: () => [],
            text: () => 'final response',
          },
        });
      }
    });
    const response = await service.processMessage('Trigger unknown');
    expect(response).toBe('final response');
  });

  const functionCallCases = [
    {
      name: 'getEducation',
      expected: { education: { degree: 'B.Tech' } },
      getResult: () => [{ degree: 'B.Tech' }],
    },
    {
      name: 'getWorkExperience',
      expected: { workExperience: [{ company: 'TestCorp' }] },
      getResult: () => [{ company: 'TestCorp' }],
    },
    {
      name: 'getProjects',
      expected: { projects: [{ name: 'ProjectX' }] },
      getResult: () => [{ name: 'ProjectX' }],
    },
    {
      name: 'getOverview',
      expected: { overview: { name: 'Anil' } },
      getResult: () => [{ name: 'Anil' }],
    },
    {
      name: 'getContact',
      expected: { contact: { email: 'anil@example.com' } },
      getResult: () => [{ email: 'anil@example.com' }],
    },
    {
      name: 'getVolunteering',
      expected: { volunteering: [{ org: 'NGO' }] },
      getResult: () => [{ org: 'NGO' }],
    },
    {
      name: 'getAbout',
      expected: { about: { description: 'About page' } },
      getResult: () => [{ description: 'About page' }],
    },
  ];

  functionCallCases.forEach(({ name, expected }) => {
    it(`should handle function call: ${name}`, async () => {
      let callCount = 0;
      mockChatSession.sendMessage.and.callFake(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            response: {
              functionCalls: () => [{ name }],
              text: () => 'response text',
            },
          });
        } else {
          return Promise.resolve({
            response: {
              functionCalls: () => [],
              text: () => JSON.stringify(expected),
            },
          });
        }
      });
      const response = await service.processMessage('Trigger ' + name);
      expect(response).toBe(JSON.stringify(expected));
    });
  });
});
