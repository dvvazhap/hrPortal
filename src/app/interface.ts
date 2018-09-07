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

export interface EmployeeInfo {
    email: string;
    name: string;
    phone: string;
    looking: number;
    fullTime: number;
    partTime: number;
    intern: number;
    designation: string;
    company: string;
    cur_location: string;
    fut_location: string;
    experience: number;
    noticePeriod: number;
    degree: string;
    stream: string;
    institution: string;
    passout: number;
    skills: string;
    specificReq: string;
    gender:string;
    viewers: number;
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
    noticePeriod: number;
    gender:string;
    count:number;
    viewers: number;
}