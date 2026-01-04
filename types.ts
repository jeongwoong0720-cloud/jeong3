
export type CountryCode = 'VN' | 'TH' | 'CN' | 'KH' | 'UZ' | 'RU' | 'PH' | 'ALL';

export enum RiskLevel {
    STABLE = 'Stable',
    MONITOR = 'Monitor',
    HIGH_RISK = 'High Risk'
}

export enum InformantStatus {
    ACTIVE = 'ACTIVE',
    IDLE = 'IDLE',
    INACTIVE = 'INACTIVE'
}

export interface Community {
    id: string;
    name: string;
    country: string;
    countryCode: CountryCode;
    platform: string;
    link: string;
    memberCount: string;
    description: string;
    riskLevel: RiskLevel;
    lastActive: string;
    imageUrl: string;
}

export interface Activity {
    date: string;
    title: string;
    description: string;
}

export interface Informant {
    id: string;
    name: string;
    codeName: string;
    country: string;
    countryCode: CountryCode;
    contact: string;
    platform: string;
    mainCommunity: string;
    status: InformantStatus;
    reliability: 'A' | 'B' | 'C';
    lastContact: string;
    nationality: string;
    birthDate: string;
    visaStatus: string;
    address: string;
    history: Activity[];
    notes: string;
    imageUrl: string;
}

export interface CountrySummary {
    id: CountryCode;
    name: string;
    flag: string;
    jurisdiction: string;
    riskLevel: RiskLevel;
    communityCount: number;
    informantCount: number;
}
