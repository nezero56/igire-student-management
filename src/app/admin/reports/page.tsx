import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { FileText, Download } from "lucide-react";

const reports = [
  { id: "r1", title: "Monthly Attendance Report", type: "attendance", date: "2024-03-01" },
  { id: "r2", title: "Cohort 5 Performance Summary", type: "performance", date: "2024-03-01" },
  { id: "r3", title: "Assignment Completion Report", type: "assignment", date: "2024-02-28" },
  { id: "r4", title: "Cohort Overview", type: "cohort", date: "2024-02-15" },
];

const typeVariant = {
  attendance: "info",
  performance: "success",
  assignment: "secondary",
  cohort: "default",
} as const;

export default function AdminReportsPage() {
  return (
    <>
      <Header title="Reports" userName="Alice Uwimana" />
      <PageWrapper>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{reports.length} reports available</p>
            <Button size="sm">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="flex items-center justify-between gap-4 pt-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <FileText className="h-5 w-5 text-gray-500" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{report.title}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          label={report.type}
                          variant={typeVariant[report.type as keyof typeof typeVariant]}
                        />
                        <span className="text-xs text-gray-400">{report.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" aria-label="Download">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
