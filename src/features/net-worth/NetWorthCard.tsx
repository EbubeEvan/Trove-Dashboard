import { Eye, EyeOff, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../../core/design-system/Card';
import { useUiStore } from '../../core/stores/ui-store';
import type { Holding } from '../../lib/types';
import { computeTotals, formatCurrency, formatSignedPercent } from '../../lib/derivePortfolio';
import { InvestedVsCurrentChart } from './InvestedVsCurrentChart';
import { cx } from '../../lib/classNames';

interface NetWorthCardProps {
  holdings: Holding[];
  currency: string;
}

export function NetWorthCard({ holdings, currency }: NetWorthCardProps) {
  const balanceHidden = useUiStore((s) => s.balanceHidden);
  const toggleBalance = useUiStore((s) => s.toggleBalance);

  const totals = computeTotals(holdings);
  const isPositive = totals.netGainLossAmount >= 0;

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-(length:--font-size-caption) font-medium text-(--color-text-neutral)">
          Total Net Worth
        </span>
        <button
          className="flex cursor-pointer items-center justify-center rounded-md border-0 bg-transparent p-1 text-(--color-text-neutral) transition-colors duration-180 ease-in-out hover:bg-(--color-bg-default)"
          onClick={toggleBalance}
          aria-label={balanceHidden ? 'Show balance' : 'Hide balance'}
        >
          {balanceHidden ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <div className="mt-(--space-2) flex flex-wrap items-center gap-(--space-3)">
        <span className="text-(length:--font-size-net-worth) font-semibold tracking-[-0.5px] text-(--color-text-default)">
          {balanceHidden ? '••••••' : formatCurrency(totals.totalCurrentValue, currency)}
        </span>
        {!balanceHidden && (
          <span
            className={cx(
              'inline-flex items-center gap-1 rounded-(--radius-pill) px-2.5 py-[3px] text-(length:--font-size-body) font-semibold',
              isPositive
                ? 'bg-(--color-success-bg) text-(--color-success)'
                : 'bg-(--color-negative-bg) text-(--color-negative)',
            )}
          >
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {formatSignedPercent(totals.netGainLossPercent)}
          </span>
        )}
      </div>

      {!balanceHidden && (
        <InvestedVsCurrentChart totalInvested={totals.totalInvested} totalCurrentValue={totals.totalCurrentValue} />
      )}
    </Card>
  );
}
