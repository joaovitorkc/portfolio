import { create } from 'zustand';

type UiState = {
  /** id of the chapter currently filling the viewport */
  activeChapter: string;
  setActiveChapter: (id: string) => void;

  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  togglePalette: () => void;

  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;

  /** the terminal asks for focus when opened from the palette */
  terminalFocusRequest: number;
  requestTerminalFocus: () => void;
};

export const useUi = create<UiState>((set) => ({
  activeChapter: 'cover',
  setActiveChapter: (id) => set((s) => (s.activeChapter === id ? s : { activeChapter: id })),

  paletteOpen: false,
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  togglePalette: () => set((s) => ({ paletteOpen: !s.paletteOpen })),

  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),

  terminalFocusRequest: 0,
  requestTerminalFocus: () => set((s) => ({ terminalFocusRequest: s.terminalFocusRequest + 1 })),
}));
