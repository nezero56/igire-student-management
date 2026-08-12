import { Header } from "@/src/components/layout/header";
import { PageWrapper } from "@/src/components/layout/page-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Avatar } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { mockStudents, mockTrainers } from "@/src/data/mock-data";
import { formatDate } from "@/src/lib/utils";
import { Mail, Phone, Calendar, GraduationCap } from "lucide-react";

const me = mockStudents.find((s) => s.id === "s1")!;
const myTrainer = mockTrainers.find((t) => t.id === me.trainerId);

export default function StudentProfilePage() {
  return (
    <>
      <Header title="My Profile" userName={me.name} />
      <PageWrapper>
        <div className="max-w-2xl">
          <Card>
            <CardContent className="pt-8">
              {/* Avatar + name */}
              <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                <Avatar name={me.name} size="lg" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{me.name}</h2>
                  <p className="text-sm text-gray-500">
                    {me.program} · {me.cohort}
                  </p>
                  <div className="mt-1.5">
                    <Badge
                      label={me.status}
                      variant={me.status === "active" ? "success" : "default"}
                    />
                  </div>
                </div>
              </div>

              {/* Details */}
              <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <dt className="text-xs text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{me.email}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <div>
                    <dt className="text-xs text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900">{me.phone}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <dt className="text-xs text-gray-500">Enrolled</dt>
                    <dd className="text-sm text-gray-900">{formatDate(me.enrolledAt)}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <div>
                    <dt className="text-xs text-gray-500">Trainer</dt>
                    <dd className="text-sm text-gray-900">
                      {myTrainer?.name ?? "—"}
                    </dd>
                  </div>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </PageWrapper>
    </>
  );
}
