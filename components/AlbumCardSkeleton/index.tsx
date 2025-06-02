import { Skeleton } from '@/components/ui/skeleton';

export function AlbumCardSkeleton() {
  return (
    <div className="h-[400px] w-[400px] border border-white/[0.1] flex flex-col space-y-3 rounded-xl p-4">
      <Skeleton className="h-full w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
