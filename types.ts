
export interface FormData {
  companyName: string;
  userRole: string;
  motive: string;
  platforms: string[];
  tone: string;
  keyPoints: string;
}

export interface GeneratedMessage {
  platform: string;
  subject: string | null;
  body: string;
}

export interface ContactSuggestion {
  role: string;
  reason: string;
}

export interface GroundingSource {
    web?: {
        uri: string;
        title: string;
    }
}

export interface GenerationResult {
  messages: GeneratedMessage[];
  contacts: {
    suggestions: string;
    sources: GroundingSource[];
  }
}
