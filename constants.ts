
import { Community, Informant, CountrySummary, RiskLevel, InformantStatus } from './types';

export const COUNTRIES: CountrySummary[] = [
    { id: 'VN', name: 'Vietnam', flag: '🇻🇳', jurisdiction: 'Jurisdiction A', riskLevel: RiskLevel.HIGH_RISK, communityCount: 12, informantCount: 5 },
    { id: 'TH', name: 'Thailand', flag: '🇹🇭', jurisdiction: 'Jurisdiction B', riskLevel: RiskLevel.MONITOR, communityCount: 15, informantCount: 8 },
    { id: 'CN', name: 'China', flag: '🇨🇳', jurisdiction: 'Jurisdiction A', riskLevel: RiskLevel.STABLE, communityCount: 8, informantCount: 3 },
    { id: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', jurisdiction: 'Jurisdiction C', riskLevel: RiskLevel.STABLE, communityCount: 6, informantCount: 2 },
    { id: 'PH', name: 'Philippines', flag: '🇵🇭', jurisdiction: 'Jurisdiction B', riskLevel: RiskLevel.MONITOR, communityCount: 10, informantCount: 4 },
];

export const COMMUNITIES: Community[] = [
    {
        id: 'c1',
        name: '주한 베트남 정보방',
        country: 'Vietnam',
        countryCode: 'VN',
        platform: 'Facebook Group',
        link: 'https://facebook.com/groups/vninkorea',
        memberCount: '12.5k',
        description: '취업 정보 및 비자 관련 질의응답이 활발한 대표 커뮤니티입니다. 주로 제조업 종사자들이 많습니다.',
        riskLevel: RiskLevel.HIGH_RISK,
        lastActive: '10분 전',
        imageUrl: 'https://picsum.photos/seed/vn/200/200'
    },
    {
        id: 'c2',
        name: '태국인 벼룩시장',
        country: 'Thailand',
        countryCode: 'TH',
        platform: 'Line Square',
        link: 'https://line.me/ti/g2/thaimarket',
        memberCount: '8.2k',
        description: '중고 물품 거래 및 환전 관련 게시글이 다수 올라오는 장터형 커뮤니티입니다.',
        riskLevel: RiskLevel.MONITOR,
        lastActive: '1시간 전',
        imageUrl: 'https://picsum.photos/seed/th/200/200'
    },
    {
        id: 'c3',
        name: '재한 중국 유학생 연합',
        country: 'China',
        countryCode: 'CN',
        platform: 'WeChat',
        link: 'https://wechat.com/csa_korea',
        memberCount: '25k',
        description: '대학별 유학생 정보 공유 및 학업 관련 자료 나눔이 주를 이룹니다.',
        riskLevel: RiskLevel.STABLE,
        lastActive: '1일 전',
        imageUrl: 'https://picsum.photos/seed/cn/200/200'
    }
];

export const INFORMANTS: Informant[] = [
    {
        id: 'i1',
        name: '응우옌 반 A',
        codeName: 'VN-01',
        country: 'Vietnam',
        countryCode: 'VN',
        contact: '010-1234-5678',
        platform: 'Facebook',
        mainCommunity: '안산시 베트남 모임',
        status: InformantStatus.ACTIVE,
        reliability: 'A',
        lastContact: '2일 전',
        nationality: '베트남 (Vietnam)',
        birthDate: '1990.05.20',
        visaStatus: 'F-5 (영주권)',
        address: '경기도 수원시 팔달구...',
        history: [
            { date: '2023.10.15', title: '불법 도박장 제보', description: '관내 유흥가 인근 건물 지하 1층에서 외국인 전용 불법 도박장 운영 첩보 제공.' },
            { date: '2023.09.20', title: '환치기 알선책 정보 제공', description: 'SNS를 통한 불법 환전 광고 계정 및 운영자 추정 인물 정보 제공.' }
        ],
        notes: '한국어 능통하며 협조적이나, 신분 노출에 대해 극도로 민감해함. 접선 시 사복 착용 필수.',
        imageUrl: 'https://picsum.photos/seed/man1/200/200'
    },
    {
        id: 'i2',
        name: 'Li Wei',
        codeName: 'CN-88',
        country: 'China',
        countryCode: 'CN',
        contact: '010-8888-9999',
        platform: 'WeChat',
        mainCommunity: '서울 유학생회',
        status: InformantStatus.ACTIVE,
        reliability: 'B',
        lastContact: '5시간 전',
        nationality: '중국 (China)',
        birthDate: '1995.12.10',
        visaStatus: 'D-2 (유학)',
        address: '서울특별시 관악구 대학동',
        history: [],
        notes: '학업 태도 우수하나 최근 경제적 어려움 호소. 정보 신뢰도 보강 필요.',
        imageUrl: 'https://picsum.photos/seed/man2/200/200'
    }
];
