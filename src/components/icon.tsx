import type {SVGProps} from 'react';

const paths={dashboard:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',radar:'M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8 2 2m0-12-2 2m-8 8-2 2M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6',briefcase:'M4 7h16v12H4zM9 7V5h6v2m-11 4h16',library:'M5 3h12v18H5zM8 3v18m12-15v15',users:'M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20m11-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6M9 10a2.5 2.5 0 1 0 0-5',folder:'M3 6h7l2 2h9v11H3z',check:'M5 12l4 4L19 6',cash:'M4 6h16v12H4zM8 12h.01M16 12h.01M12 9a3 3 0 1 1 0 6',shield:'M12 3l7 3v5c0 4.5-3 7.7-7 10-4-2.3-7-5.5-7-10V6zM9 12l2 2 4-4',search:'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14m5 12 4 4'} as const;
export type IconName=keyof typeof paths;
export function Icon({name,...props}:{name:IconName}&SVGProps<SVGSVGElement>){return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]}/></svg>}
