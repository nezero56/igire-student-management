import { cn } from "@/src/lib/utils";
import { Card } from "@/src/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: number; label: string };
  color?: "indigo" | "green" | "yellow" | "red" | "blue";
}

const colorMap = {
  indigo: "bg-indigo-50 text-indigo-600",
  green: "bg-green-50 text-green-600",
  yellow: "bg-yellow-50 text-yellow-600",
  red: "bg-red-50 text-red-600",
  blue: "bg-blue-50 text-blue-600",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "indigo",
}: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium",
                trend.value >= 0 ? "text-green-600" : "text-red-500"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            colorMap[color]
          )}
        >
          <Icon className="h-6 w-6" />
        </span>
      </div>
    </Card>
  );
}
