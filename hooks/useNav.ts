import { create } from 'zustand';

interface AuthProps {
  isCCenterOpen: boolean;
  onCCenterOpen: () => void;
  onCCenterClose: () => void;
}

export const useAuth = create<AuthProps>(set => ({
  isCCenterOpen: false,
  onCCenterOpen: () => set({ isCCenterOpen: true }),
  onCCenterClose: () => set({ isCCenterOpen: false }),
}));
