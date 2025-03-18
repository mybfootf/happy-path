import { create } from 'zustand';

interface NavProps {
  isCCenterOpen: boolean;
  onCCenterOpen: () => void;
  onCCenterClose: () => void;
  isSideNavExpanded: boolean;
  onSideNavExpand: () => void;
  onSideNavCollapse: () => void;
}

export const useNav = create<NavProps>(set => ({
  isCCenterOpen: false,
  onCCenterOpen: () => set({ isCCenterOpen: true }),
  onCCenterClose: () => set({ isCCenterOpen: false }),
  isSideNavExpanded: false,
  onSideNavExpand: () => set({ isSideNavExpanded: true }),
  onSideNavCollapse: () =>
    set({ isSideNavExpanded: false }),
}));
