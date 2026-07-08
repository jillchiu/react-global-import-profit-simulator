import type { Theme, ThemeMode } from "../model/types";

export const themes: Record<ThemeMode, Theme> = {
    dark: {
        background: 'bg-slate-950',
        text: 'text-slate-100',
        subText: 'text-slate-400',

        card: 'bg-slate-900',
        border: 'border border-slate-700',
        hover: 'hover:bg-slate-700',

        accent: 'accent-sky-400',

        selectedBorder: 'border border-sky-500 bg-sky-900/20 shadow'

    },

    light: {
        background: 'bg-slate-50',
        text: 'text-slate-900',
        subText: 'text-slate-500',

        card: 'bg-white',
        border: 'border border-slate-200',
        hover: 'hover:bg-slate-100',

        accent: 'accent-sky-600',

        selectedBorder: 'border border-sky-500 bg-sky-50 shadow'

    }

}

export default function getModeTheme(mode: ThemeMode): Theme{
    return themes[mode]

}