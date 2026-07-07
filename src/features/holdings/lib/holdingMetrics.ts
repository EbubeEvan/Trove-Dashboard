import {
  currentValue,
  hasUnavailablePrice,
  investedValue,
  isClosedPosition,
} from '../../../lib/derivePortfolio';
import type { Holding } from '../types/holding';
import type { HoldingGainLoss } from '../types/holdingMetrics';

export function gainLoss(h: Holding): HoldingGainLoss {
  if (hasUnavailablePrice(h) || isClosedPosition(h)) {
    return { amount: 0, percent: 0 };
  }
  const invested = investedValue(h);
  const amount = currentValue(h) - invested;
  const percent = invested === 0 ? 0 : (amount / invested) * 100;
  return { amount, percent };
}
