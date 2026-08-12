import { cn } from "@/src/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }: CardProps) {
  return (
    <div className={cn("flex flex-col gap-1 p-6 pb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children }: CardProps) {
  return (
    <h3 className={cn("text-base font-semibold text-gray-900", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children }: CardProps) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}
