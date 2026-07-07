import { Eye, EyeOff, TrendingDown, TrendingUp } from 'lucide-react';

import { Card } from '../../../core/design-system/Card';
import { useUiStore } from '../../../core/stores/ui-store';
import { cx } from '../../../lib/classNames';
import { formatCurrency, formatSignedPercent } from '../../../lib/derivePortfolio';
import { computeTotals } from '../lib/computeTotals';
import type { NetWorthHolding } from '../types/netWorth';
import { InvestedVsCurrentChart } from './InvestedVsCurrentChart';

interface NetWorthCardProps {
  holdings: NetWorthHolding[];
  currency: string;
}

export function NetWorthCard({ holdings, currency }: Readonly<NetWorthCardProps>) {
  const balanceHidden = useUiStore((s) => s.balanceHidden);
  const toggleBalance = useUiStore((s) => s.toggleBalance);

  const totals = computeTotals(holdings);
  const isPositive = totals.netGainLossAmount >= 0;

  return (
    <Card className='flex flex-col'>
      <div className='flex items-center justify-between'>
        <span className='text-size-caption text-text-neutral font-medium'>Total Net Worth</span>
        <button
          className='text-text-neutral hover:bg-bg-default flex cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-1 transition-colors duration-180 ease-in-out'
          onClick={toggleBalance}
          aria-label={balanceHidden ? 'Show balance' : 'Hide balance'}
        >
          {balanceHidden ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className='mt-2 flex flex-wrap items-center gap-3'>
        <span className='text-size-net-worth text-text-default font-semibold tracking-[-0.5px]'>
          {balanceHidden ? '••••••' : formatCurrency(totals.totalCurrentValue, currency)}
        </span>
        {!balanceHidden && (
          <span
            className={cx(
              'rounded-pill text-size-body inline-flex items-center gap-1 px-2.5 py-[3px] font-semibold',
              isPositive ? 'bg-success-bg text-success' : 'bg-negative-bg text-negative',
            )}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {formatSignedPercent(totals.netGainLossPercent)}
          </span>
        )}
      </div>

      {!balanceHidden && (
        <InvestedVsCurrentChart
          totalInvested={totals.totalInvested}
          totalCurrentValue={totals.totalCurrentValue}
        />
      )}
    </Card>
  );
}
