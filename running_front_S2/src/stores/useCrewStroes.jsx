import { create } from "zustand";
import { reqCrewDetail } from "../api/Crew/crewApi";

export const useCrewStore = create((set) => ({
  crewId: null,
  setCrewId: (id) => set({ crewId: id }),

  crew: null,
  setCrew: (crewData) => set({ crew: crewData }),

  isMember: false,
  setIsMember: (value) => set({ isMember: value }),
  
  resetCrew: () =>
    set({
      crewId: null,
      crew: null,
      isMember: false,
    }),
}));