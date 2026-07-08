import { Card } from '../../../components/ui/Card';
import { Skeleton } from '../../../components/ui/Skeleton';

export function DashboardSkeleton() {
  return (
    <div className='flex flex-col gap-5' aria-busy='true' aria-label='Loading portfolio'>
      <div className='grid grid-cols-[1.2fr_1fr] items-stretch gap-5 max-[900px]:grid-cols-1'>
        <Card className='flex min-h-[280px] flex-col'>
          <Skeleton width={120} height={13} />
          <div className='mt-3'>
            <Skeleton width={180} height={30} />
          </div>
          <div className='mt-5 flex-1'>
            <Skeleton height={140} radius='12px' />
          </div>
        </Card>
        <Card>
          <Skeleton width={140} height={16} />
          <div className='mt-5'>
            <Skeleton height={12} radius='999px' />
          </div>
          <div className='mt-5 flex gap-4'>
            <Skeleton width={70} height={30} />
            <Skeleton width={70} height={30} />
            <Skeleton width={70} height={30} />
          </div>
        </Card>
      </div>

      <div>
        <Skeleton width={90} height={16} />
        <div className='mt-3 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4'>
          {[0, 1, 2, 3].map((i) => (
            <Card key={i} padding='compact'>
              <Skeleton width={90} height={13} />
              <div className='mt-2'>
                <Skeleton width={60} height={11} />
              </div>
              <div className='mt-2.5'>
                <Skeleton width={100} height={20} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <div className='flex gap-2'>
          <Skeleton width={60} height={28} radius='999px' />
          <Skeleton width={55} height={28} radius='999px' />
        </div>
        <div className='mt-4 flex flex-col gap-3'>
          <Skeleton width={200} height={36} radius='10px' />
          <div className='flex gap-2'>
            <Skeleton width={48} height={28} radius='999px' />
            <Skeleton width={64} height={28} radius='999px' />
            <Skeleton width={52} height={28} radius='999px' />
          </div>
          <div className='flex flex-col gap-3'>
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} height={64} radius='14px' />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
