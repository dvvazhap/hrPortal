export interface UserInfo {
    token?: string;
    email?: string;
    v_profile?: number;
    validity?: string;
    user_type?: number;
    name?: string;
}

export interface EmployerInfo {
    email: string;
    designation: string;
    name: string;
    org_name: string;
    city: string;
    phone: string;
}

export interface Feedback {
    email: string;
    subject: string;
    profile: number;
}

export interface Education {
    email: string;
    ind: number;
    college: string; 
    degree: string; 
    stream: string;
    start: string;
    end: string;
    cgpa: string; 
    percentage: string;
}

export interface Projects {
    email: string;
    ind: number;
    name: string; 
    description: string; 
    skills: string;
    start: string;
    end: string;
}

export interface WorkExperience {
    email: string;
    ind: number;
    company: string; 
    description: string; 
    start: string;
    end: string;
    present: boolean;
}

export interface EmployeeInfo {
    email: string;
    name: string;
    phone: string;
    looking: number;
    fullTime: number;
    partTime: number;
    intern: number;
    designation: string;
    fut_location: string;
    experience: string;
    noticePeriod: string;
    education: Education[];
    work_experience: WorkExperience[];
    projects: Projects[];
    skills: string;
    specificReq: string;
    gender:string;
    viewers: number;
    objective:string;
    languages:string;
    academic_ach:string;
    extra_curricular:string;
    certifications:string;
    hobbies:string;
    address:string;
    linkedin:string;
}

export interface OpeningInfo {
    ind: number;
    timestamp: string; 
    email: string;
    fullTime: number;
    partTime: number;
    intern: number;
    designation: string;
    company: string;
    location: string;
    contact: string;
    min_years: number;
    max_years: number;
    skills: string;
    specificReq: string;
    description: string;
    gender:string;
    count:number;
    viewers: number;
}