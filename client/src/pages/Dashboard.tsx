import { DashboardLayout } from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { Empty } from "@/components/ui/empty";
import { Navigate } from "wouter";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { data: projects, isLoading: isLoadingProjects, error: projectsError } = trpc.feature.list.useQuery();
  const createProjectMutation = trpc.feature.create.useMutation({
    onSuccess: () => trpc.useUtils().feature.list.invalidate(),
  });

  if (!isAuthenticated) return <Navigate to="/" />;

  const handleCreateProject = () => {
    // Logic to open a dialog or form to create a new project
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingProjects ? <Skeleton /> : <span>{projects?.length || 0}</span>}
            </CardContent>
          </Card>
          {/* Additional metric cards can be added here */}
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Projects</h2>
            <Button onClick={handleCreateProject}>Add New Project</Button>
          </div>

          {isLoadingProjects && <Skeleton className="h-48" />}
          {projectsError && <Alert type="error" message="Failed to load projects." />}
          {projects?.length === 0 && <Empty message="No projects found. Start by adding a new project." />}

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects?.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}