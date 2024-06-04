import { Skeleton } from "@/components/ui/skeleton";
import { AuroraBackground } from "../../aurora-background";

export function VersusSkeletonLoader() {
  return (
    <AuroraBackground className=" flex flex-col items-center justify-center gap-20">
      <Skeleton className="h-4 w-1/4" />
      <ul className="flex items-center justify-center gap-40">
        {Array.from({ length: 2 }).map((_, index) => (
          <li
            key={index}
            className="h-[400px] w-[400px] border border-white/[0.1] flex flex-col space-y-3 rounded-xl p-4"
          >
            <Skeleton className="h-full w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </li>
        ))}
      </ul>
    </AuroraBackground>
  );
}
