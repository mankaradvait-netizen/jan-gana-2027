import { STATES_AND_UTS } from "./data/statesData";
import { CENSUS_MYTHS } from "./data/mythsData";

export interface UserRecord {
  id: string;
  mobileNumber: string;
  aadhaarHash: string;
  role: 'CITIZEN' | 'ENUMERATOR' | 'ADMIN';
  createdAt: Date;
}

export interface HouseholdRecord {
  id: string;
  censusId: string;
  userId?: string;
  state: string;
  district: string;
  address: string;
  houseType: string;
  amenities: {
    drinkingWater: string;
    electricity: string;
    lightingSource: string;
    latrineType: string;
    cookingFuel: string;
    lpgPipedGas: boolean;
    drainage: string;
    bathingFacility: boolean;
  };
  assets: {
    radio: boolean;
    television: boolean;
    internet: boolean;
    laptopComputer: boolean;
    twoWheeler: boolean;
    fourWheeler: boolean;
    smartPhone: boolean;
  };
  phase1Status: 'PENDING' | 'COMPLETED' | 'VERIFIED';
  createdAt: Date;
}

export interface MemberRecord {
  id: string;
  householdId: string;
  fullName: string;
  age: number;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  relationToHead: string;
  maritalStatus: string;
  motherTongue: string;
  otherLanguages?: string[];
  literacyLevel: string;
  occupation: string;
  migrationReason?: string;
  phase2Status: 'PENDING' | 'COMPLETED' | 'VERIFIED';
}

export interface ClaimRecord {
  id: string;
  claimText: string;
  aiVerdict: 'TRUE' | 'FALSE' | 'PARTIALLY_TRUE';
  explanation: string;
  language: string;
  verifiedAt: Date;
}

// In-Memory Global Mock Database Store (persists across hot reloads)
declare global {
  var __CENSUS_USERS__: UserRecord[] | undefined;
  var __CENSUS_HOUSEHOLDS__: HouseholdRecord[] | undefined;
  var __CENSUS_MEMBERS__: MemberRecord[] | undefined;
  var __CENSUS_CLAIMS__: ClaimRecord[] | undefined;
}

const users: UserRecord[] = global.__CENSUS_USERS__ || [];
const households: HouseholdRecord[] = global.__CENSUS_HOUSEHOLDS__ || [
  {
    id: "sample-hh-1",
    censusId: "IND-2027-MH-892104",
    state: "Maharashtra",
    district: "Pune",
    address: "B-402, Shivajinagar Heights, FC Road",
    houseType: "Pucca",
    amenities: {
      drinkingWater: "Treated Tap Water inside premises",
      electricity: "Grid Electricity Connection",
      lightingSource: "LED / Solar Grid",
      latrineType: "Flush Latrine connected to sewer",
      cookingFuel: "PNG / Piped Natural Gas",
      lpgPipedGas: true,
      drainage: "Closed Drainage",
      bathingFacility: true,
    },
    assets: {
      radio: false,
      television: true,
      internet: true,
      laptopComputer: true,
      twoWheeler: true,
      fourWheeler: true,
      smartPhone: true,
    },
    phase1Status: "COMPLETED",
    createdAt: new Date(),
  },
];
const members: MemberRecord[] = global.__CENSUS_MEMBERS__ || [
  {
    id: "sample-mem-1",
    householdId: "sample-hh-1",
    fullName: "Rajesh Ramchandra Deshmukh",
    age: 44,
    gender: "MALE",
    relationToHead: "Head of Family",
    maritalStatus: "Currently Married",
    motherTongue: "Marathi",
    otherLanguages: ["Hindi", "English"],
    literacyLevel: "Post Graduate / Master's Degree",
    occupation: "Software Engineer / Tech Lead",
    migrationReason: "Employment",
    phase2Status: "COMPLETED",
  },
  {
    id: "sample-mem-2",
    householdId: "sample-hh-1",
    fullName: "Pooja Rajesh Deshmukh",
    age: 41,
    gender: "FEMALE",
    relationToHead: "Spouse",
    maritalStatus: "Currently Married",
    motherTongue: "Marathi",
    otherLanguages: ["Hindi", "English"],
    literacyLevel: "Graduate / Bachelor's Degree",
    occupation: "High School Teacher",
    migrationReason: "Marriage",
    phase2Status: "COMPLETED",
  },
];
const claims: ClaimRecord[] = global.__CENSUS_CLAIMS__ || [];

if (process.env.NODE_ENV !== "production") {
  global.__CENSUS_USERS__ = users;
  global.__CENSUS_HOUSEHOLDS__ = households;
  global.__CENSUS_MEMBERS__ = members;
  global.__CENSUS_CLAIMS__ = claims;
}

export const db = {
  user: {
    create: async (data: Omit<UserRecord, 'id' | 'createdAt'>) => {
      const user: UserRecord = {
        ...data,
        id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date(),
      };
      users.push(user);
      return user;
    },
    findUnique: async (mobile: string) => {
      return users.find((u) => u.mobileNumber === mobile) || null;
    },
  },
  household: {
    create: async (data: Omit<HouseholdRecord, 'id' | 'createdAt'>) => {
      const hh: HouseholdRecord = {
        ...data,
        id: `hh-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date(),
      };
      households.push(hh);
      return hh;
    },
    findByCensusId: async (censusId: string) => {
      return households.find((h) => h.censusId.toLowerCase() === censusId.toLowerCase()) || null;
    },
    list: async () => households,
  },
  member: {
    createMany: async (memberList: Omit<MemberRecord, 'id'>[]) => {
      const inserted: MemberRecord[] = memberList.map((m) => ({
        ...m,
        id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      }));
      members.push(...inserted);
      return inserted;
    },
    findByHouseholdId: async (householdId: string) => {
      return members.filter((m) => m.householdId === householdId);
    },
  },
  stateSchedule: {
    list: async () => STATES_AND_UTS,
    findByCode: async (code: string) => {
      return STATES_AND_UTS.find((s) => s.code.toUpperCase() === code.toUpperCase()) || null;
    },
  },
  claim: {
    create: async (data: Omit<ClaimRecord, 'id' | 'verifiedAt'>) => {
      const claim: ClaimRecord = {
        ...data,
        id: `claim-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        verifiedAt: new Date(),
      };
      claims.push(claim);
      return claim;
    },
    listRecent: async () => claims.slice(-10).reverse(),
  },
};
