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
          description:
            "Retrieve Anil's education details, including degrees (EducationItems), certifications (CertificationItems), and language proficiency (LanguageItems). Use this to answer questions about his academic background or skills in a friendly, engaging way.",
        },
        {
          name: 'getWorkExperience',
          description:
            "Retrieve Anil's work experience, job entries with details like titles, companies, and technologies used. Craft responses highlighting his professional journey with a touch of humor.",
        },
        {
          name: 'getProjects',
          description:
            "Retrieve Anil's project details, projects with descriptions, technologies, and outcomes. Present them as cool achievements he'd proudly share.",
        },
        {
          name: 'getOverview',
          description:
            "Retrieve an overview of Anil's portfolio, including his name, position, description, and interests. Use this for a quick intro with his personal flair.",
        },
        {
          name: 'getContact',
          description:
            "Retrieve Anil's contact info, like email, phone, LinkedIn, GitHub, etc. Share it like Anil's handing out his business card with a smile.",
        },
        {
          name: 'getVolunteering',
          description:
            '"Retrieve Anil\'s volunteering experiences, entries with descriptions and dates. Highlight his community spirit in the response.",',
        },
        {
          name: 'getAbout',
          description:
            "Retrieve details about how Anil's portfolio website was created and its technologies. Explain it like Anil's giving a behind-the-scenes tour.",
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
    return await firstValueFrom(this.dataService.getData('overrview'));
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
      const functionResponses = [];
      for (const functionCall of functionCalls) {
        let responseData;
        switch (functionCall.name) {
          case 'getEducation':
            const education = await this.getEducationTool();
            responseData = { education: education[0] };
            break;
          case 'getWorkExperience':
            const experience = await this.getWorkExperienceTool();
            responseData = { workExperience: experience };
            break;
          case 'getProjects':
            const projects = await this.getProjectsTool();
            responseData = { projects: projects };
            break;
          case 'getOverview':
            const overview = await this.overview();
            responseData = { overview: overview[0] };
            break;
          case 'getContact':
            const contact = await this.contact();
            responseData = { contact: contact[0] };
            break;
          case 'getVolunteering':
            const volunteering = await this.volunteering();
            responseData = { volunteering: volunteering };
            break;
          case 'getAbout':
            const about = await this.about();
            responseData = { about: about[0] };
            break;
          default:
            // Handle unknown function calls if necessary
            responseData = { error: `Unknown function: ${functionCall.name}` };
            break;
        }
        functionResponses.push({
          functionResponse: {
            name: functionCall.name,
            response: responseData,
          },
        });
      }
      result = await this.chat.sendMessage(functionResponses);
    }
    return result.response.text();
  }
}
