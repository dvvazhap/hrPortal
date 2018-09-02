export interface UserInfo {
    email: string;
    phone: string;
    v_profile: number;
    validity: string;
    user_type: number;
}

export interface EmployerInfo {
    name: string;
    designation: string;
    org_name: string;
    city: string;
    phone: string;
}

export interface EmployeeInfo {
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
}

export interface CandidateInfo {
    email: string;
    name: string;
    phone: string;
    fullTime: number;
    partTime: number;
    intern: number;
    designation: string;
    company: string;
    cur_location: string;
    fut_location: string;
    experience: string;
    noticePeriod: number;
    degree: string;
    stream: string;
    institution: string;
    passout: number;
    skills: string;
    specificReq: string;
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
}