import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Redirect } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return <Redirect to="/" />;

  const { data: subscriptions, isLoading: isSubscriptionsLoading } = trpc.feature.list.useQuery();
  const createMutation = trpc.feature.create.useMutation({
    onSuccess: () => trpc.useUtils().feature.list.invalidate(),
  });

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const handleCreate = () => {
    createMutation.mutate({ content });
    setOpen(false);
    setContent("");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <h1 className="text-3xl md:text-5xl">Welcome, {user?.name}</h1>
        <p className="text-lg mt-2">Here's a quick overview of your account.</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              {isSubscriptionsLoading ? (
                <Skeleton className="h-10" />
              ) : (
                <p>{subscriptions?.length || 0}</p>
              )}
            </CardContent>
          </Card>
          {/* Add more metric cards as needed */}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl">Recent Activity</h2>
          {isSubscriptionsLoading ? (
            <Skeleton className="h-20 mt-4" />
          ) : subscriptions?.length ? (
            <ul className="mt-4">
              {subscriptions.map((sub) => (
                <li key={sub.subscriptionId} className="mb-2">
                  Subscription ID: {sub.subscriptionId}, Status: {sub.status}
                </li>
              ))}
            </ul>
          ) : (
            <Card className="mt-4">
              <CardContent>
                <p>No subscriptions found. Get started by creating one!</p>
              </CardContent>
            </Card>
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6" onClick={() => setOpen(true)}>
              Add Subscription
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subscription</DialogTitle>
            </DialogHeader>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter subscription details"
              className="mt-4"
            />
            <Button className="mt-4" onClick={handleCreate}>
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}