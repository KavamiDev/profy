export type ProfileContent = {
  hero: {
    fullName: string;
    title: string;
    location: string;
    photoUrl: string;
    summary: string;
  };
  contact: {
    email: string;
    phone: string;
    website: string;
    linkedin: string;
  };
  skills: {
    core: string[];
    tools: string[];
  };
  experience: Array<{
    company: string;
    role: string;
    start: string;
    end: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    start: string;
    end: string;
  }>;
  projects: Array<{
    name: string;
    link: string;
    description: string;
  }>;
  certifications: string[];
  languages: Array<{
    name: string;
    level: string;
  }>;
  extras: {
    interests: string[];
  };
};

export const defaultProfileContent: ProfileContent = {
  hero: {
    fullName: "",
    title: "",
    location: "",
    photoUrl: "",
    summary: ""
  },
  contact: {
    email: "",
    phone: "",
    website: "",
    linkedin: ""
  },
  skills: {
    core: [],
    tools: []
  },
  experience: [],
  education: [],
  projects: [],
  certifications: [],
  languages: [],
  extras: {
    interests: []
  }
};
