export interface AllocationHolding {
  sector: string;
  shares: number;
  currentPrice: number;
}

export interface SectorAllocation {
  sector: string;
  value: number;
  percent: number;
}
