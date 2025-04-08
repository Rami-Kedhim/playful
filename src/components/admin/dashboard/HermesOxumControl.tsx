
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Brain, Activity, Settings, BarChart, Download } from "lucide-react";
import HermesOxumMonitor from "@/components/admin/HermesOxumMonitor";
import BrainHubHealthMonitor from "./BrainHubHealthMonitor";

const HermesOxumControl: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            HERMES-OXUM Engine Control
          </h2>
          <p className="text-muted-foreground">
            Monitor and control AI recommendation engine performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button variant="default" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configuration
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <HermesOxumMonitor />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Activity className="mr-2 h-5 w-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Detailed performance analytics will be implemented soon.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BrainHubHealthMonitor />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">System Diagnostics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Advanced system diagnostics will be implemented soon.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Settings className="mr-2 h-5 w-5" />
                Engine Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Advanced engine configuration will be implemented soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HermesOxumControl;
