import type { ReactNode } from 'react';

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: Readonly<TooltipProps>) {
  return (
    <span className="group relative inline-flex w-full">
      {children}
      <span
        className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-20 -translate-y-1/2 -translate-x-1 whitespace-nowrap rounded-lg bg-dark-blue px-2.5 py-1.5 text-size-caption font-medium text-white opacity-0 transition-[opacity,transform] duration-180 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
        role="tooltip"
      >
        {label}
      </span>
    </span>
  );
}
