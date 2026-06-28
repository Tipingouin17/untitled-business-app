import { Route, Switch } from "wouter";
import { Redirect } from "wouter";  // use Redirect, NOT Navigate
import { Toaster } from "@/components/ui/sonner";  // NOT @/components/ui/toaster
import { TooltipProvider } from "@/components/ui/tooltip";  // NOT tooltip-provider
import ErrorBoundary from "./components/ErrorBoundary";  // default import, NOT named
import { ThemeProvider } from "./contexts/ThemeContext";  // NOT @/components/ui/theme-provider
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}