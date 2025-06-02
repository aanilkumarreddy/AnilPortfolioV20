import { inject, Injectable } from '@angular/core';
import { DataService } from './data';
// Placeholder for Firebase AI Logic import (update with actual SDK)
import { FirebaseApp } from '@angular/fire/app';
import {
  getVertexAI,
  getGenerativeModel,
  GenerativeModel,
  ChatSession,
  FunctionDeclarationsTool,
  ObjectSchemaInterface,
  Schema,
  getAI,
} from '@angular/fire/vertexai';
import { firstValueFrom } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AgentService {
  // private agent: FunctionDeclarationsTool; // Replace with actual Firebase AI Logic agent type
  private readonly model: GenerativeModel;
  private readonly chat: ChatSession;

  private dataService = inject(DataService);
  private firebaseApp = inject(FirebaseApp);

  constructor() {
    // Initialize agent with system instructions and tools
    const portfolioToolSet = {
      functionDeclarations: [
        {
          name: 'getEducation',
          description: 'Retrieve education details',
        },
        {
          name: 'getWorkExperience',
          description: 'Retrieve work experience details',
        },
        {
          name: 'getProjects',
          description: 'Retrieve project details',
        },
        {
          name: 'getOverview',
          description: 'Retrieve overview of the portfolio',
        },
        {
          name: 'getContact',
          description: 'Retrieve contact information',
        },
        {
          name: 'getVolunteering',
          description: 'Retrieve volunteering experience',
        },
        {
          name: 'getAbout',
          description: 'Retrieve about me section',
        },
        {
          name: 'getContact',
          description: 'Retrieve contact information',
        },
        {
          name: 'getVolunteering',
          description: 'Retrieve volunteering experience',
        },
      ],
    };

    const vertexAI = getAI(this.firebaseApp);
    const systemInstructions =
      "Hi there! I'm Anil's virtual assistant, here to help you learn more about Anil's education, work experience, and projects. I use the tools provided to fetch the most up-to-date information. When answering questions, I aim to reflect Anil's friendly, professional, and slightly humorous tone. I strive to make my responses clear, concise, and engaging, just like Anil would. Ask me anything about Anil, and I'll do my best to answer in a way that feels like Anil himself!";
    this.model = getGenerativeModel(vertexAI, {
      model: 'gemini-1.5-pro',
      systemInstruction: systemInstructions,
      tools: [portfolioToolSet],
    });
    this.chat = this.model.startChat();
    //   systemInstructions:
    //     'You are a helpful assistant for my portfolio website. Answer questions about my education, work experience, and projects using the provided tools.',
    //   tools: {
    //     getEducation: this.getEducationTool,
    //     getWorkExperience: this.getWorkExperienceTool,
    //     getProjects: this.getProjectsTool,
    //     getOverview: this.overview,
    //     getContact: this.contact,
    //     getVolunteering: this.volunteering,
    //     getAbout: this.about,
    //   },
    // };
    // Replace with actual Firebase AI Logic initialization
  }

  private getEducationTool = async () => {
    return await firstValueFrom(this.dataService.getData('education'));
  };

  private getWorkExperienceTool = async () => {
    return await firstValueFrom(this.dataService.getData('experience'));
  };

  private getProjectsTool = async () => {
    return await firstValueFrom(this.dataService.getData('projects'));
  };

  private overview = async () => {
    return await firstValueFrom(this.dataService.getData('overview'));
  };

  private contact = async () => {
    return await firstValueFrom(this.dataService.getData('contact'));
  };

  private volunteering = async () => {
    return await firstValueFrom(this.dataService.getData('volunteering'));
  };

  private about = async () => {
    return await firstValueFrom(this.dataService.getData('about'));
  };

  async processMessage(message: string) {
    let result = await this.chat.sendMessage(message);
    const functionCalls = result.response.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      for (const functionCall of functionCalls) {
        switch (functionCall.name) {
          case 'getEducation':
            const education = await this.getEducationTool();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: { education: education[0] },
                },
              },
            ]);
            break;
          case 'getWorkExperience':
            const experience = await this.getWorkExperienceTool();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: { workExperience: experience[0] },
                },
              },
            ]);
            break;
          case 'getProjects':
            const projects = await this.getProjectsTool();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: { projects: projects[0] },
                },
              },
            ]);
            break;
          case 'getOverview':
            const overview = await this.overview();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: { overview: overview[0] },
                },
              },
            ]);
            break;
          case 'getContact':
            const contact = await this.contact();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: { contact: contact[0] },
                },
              },
            ]);
            break;
          case 'getVolunteering':
            const volunteering = await this.volunteering();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: { volunteering: volunteering[0] },
                },
              },
            ]);
            break;
          case 'getAbout':
            const about = await this.about();
            result = await this.chat.sendMessage([
              {
                functionResponse: {
                  name: functionCall.name,
                  response: { about: about[0] },
                },
              },
            ]);
            break;
        }
      }
    }
    return result.response.text();
  }
}
