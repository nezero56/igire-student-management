import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Avatar } from "@/src/components/ui/avatar";
import { formatDate } from "@/src/lib/utils";

interface ActivityItem {
  id: string;
  studentName: string;
  action: string;
  date: string;
  status: "present" | "absent" | "late" | "submitted" | "graded";
}

interface RecentActivityProps {
  items: ActivityItem[];
}

const statusVariant: Record<ActivityItem["status"], "success" | "danger" | "warning" | "info" | "default"> = {
  present: "success",
  absent: "danger",
  late: "warning",
  submitted: "info",
  graded: "default",
};

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">No recent activity.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <Avatar name={item.studentName} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.studentName}
                  </p>
                  <p className="text-xs text-gray-500">{item.action}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge label={item.status} variant={statusVariant[item.status]} />
                  <span className="text-xs text-gray-400">{formatDate(item.date)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
