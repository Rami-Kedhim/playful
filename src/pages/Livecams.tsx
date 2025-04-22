import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BoostPackage } from '@/types/boost';
import { useBoostDialog } from '@/hooks/boost/useBoostDialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom';

const Livecams: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const profileId = 'some-profile-id'; // Replace with actual profile ID
  const {
    activeTab,
    setActiveTab,
    selectedPackage,
    setSelectedPackage,
    loading,
    error,
    boostStatus,
    eligibility,
    boostPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    hermesStatus,
    handleBoost,
    cancelBoost,
    formatBoostDuration,
    getBoostPrice
  } = useBoostDialog(profileId);

  const [isBoosted, setIsBoosted] = useState(false);

  const toggleBoost = () => {
    setIsBoosted(!isBoosted);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">LiveCam Dashboard</h1>

      <div className="mb-4">
        <Button onClick={() => setIsDrawerOpen(true)}>Open Settings</Button>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button>Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>Cancel</DrawerClose>
            <Button variant="destructive">Delete</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="appearance">Customize your appearance here.</TabsContent>
        <TabsContent value="notifications">Manage your notifications here.</TabsContent>
        <TabsContent value="display">Set your display preferences here.</TabsContent>
      </Tabs>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>

      <Textarea placeholder="Type your message here." />

      <Input type="email" placeholder="shadcn@example.com" />

      <Slider defaultValue={[33]} max={100} step={1} />

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Card>
        <CardContent>
          <p>LiveCam Content Here</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Button onClick={toggleBoost}>
            {isBoosted ? 'Cancel Boost' : 'Boost LiveCam'}
          </Button>
        </CardContent>
      </Card>

      <Link to="/livecam/123" className="text-blue-500 hover:underline">
        Go to Livecam Detail
      </Link>
    </div>
  );
};

export default Livecams;
