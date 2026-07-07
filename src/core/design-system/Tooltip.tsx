import type { ReactNode } from 'react';

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: Readonly<TooltipProps>) {
  return (
    <span className='group relative inline-flex w-full'>
      {children}
      <span
        className='bg-dark-blue text-size-caption pointer-events-none absolute top-1/2 left-[calc(100%+10px)] z-20 -translate-x-1 -translate-y-1/2 rounded-lg px-2.5 py-1.5 font-medium whitespace-nowrap text-white opacity-0 transition-[opacity,transform] duration-180 ease-in-out group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100'
        role='tooltip'
      >
        {label}
      </span>
    </span>
  );
}
