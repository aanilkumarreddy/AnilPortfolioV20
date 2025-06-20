import { Injectable } from '@angular/core';
import { getAI, getGenerativeModel } from '@angular/fire/vertexai';

@Injectable({ providedIn: 'root' })
export class VertexAIWrapperService {
  getAI(app: any) {
    return getAI(app);
  }
  getGenerativeModel(ai: any, config: any) {
    return getGenerativeModel(ai, config);
  }
}
