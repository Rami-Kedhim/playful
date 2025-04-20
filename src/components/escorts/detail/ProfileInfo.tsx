
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Escort, VerificationLevel } from "@/types/Escort"; // Use complete type
import ProfileHeader from "./ProfileHeader";
import ProfileActions from "./ProfileActions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { VideoIcon, ImageIcon } from "lucide-react";
import BookingDialog from "./booking/BookingDialog";

interface ProfileInfoProps {
  escort: Escort;
  onFavoriteToggle: () => void;
  onBookingOpen: () => void;
  onMessageOpen: () => void;
  onShareOpen: () => void;
}

const ProfileInfo = ({
  escort,
  onFavoriteToggle,
  onBookingOpen,
  onMessageOpen,
  onShareOpen,
}: ProfileInfoProps) => {
  const [serviceTab, setServiceTab] = useState("in-person");
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  // Normalize verificationLevel only, do not override height as it does not exist directly
  const normalizedEscort: Escort = {
    ...escort,
    verificationLevel:
      (escort.verificationLevel as VerificationLevel) || "none",
  };

  const handleBookNow = () => {
    setBookingDialogOpen(true);
  };

  const bookingOnSubmit = async (data: any) => {
    console.log("BookingDialog onSubmit called", data);
    return Promise.resolve();
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <ProfileHeader escort={normalizedEscort} onFavoriteToggle={onFavoriteToggle} />

          <div className="mt-6 mb-6">
            <Tabs value={serviceTab} onValueChange={setServiceTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="in-person">In Person</TabsTrigger>
                <TabsTrigger value="content">Virtual Content</TabsTrigger>
                <TabsTrigger value="livestream">Live Stream</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mt-4">
              {serviceTab === "in-person" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Book {normalizedEscort.name} for in-person encounters and enjoy personalized services.
                  </p>
                  <Button onClick={handleBookNow} className="w-full">
                    Book Now
                  </Button>
                </div>
              )}

              {serviceTab === "content" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Access {normalizedEscort.name}&apos;s exclusive photos, videos, and premium content.
                  </p>
                  <Button asChild className="w-full">
                    <Link to={`/escort/${normalizedEscort.id}/content`}>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      View Content
                    </Link>
                  </Button>
                </div>
              )}

              {serviceTab === "livestream" && (
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Join {normalizedEscort.name}&apos;s live streams for real-time interaction and personalized experiences.
                  </p>
                  <Button asChild className="w-full">
                    <Link to={`/escort/${normalizedEscort.id}/live`}>
                      <VideoIcon className="mr-2 h-4 w-4" />
                      Join Live Stream
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          <ProfileActions
            escort={normalizedEscort}
            onBookingOpen={onBookingOpen}
            onMessageOpen={onMessageOpen}
            onShareOpen={onShareOpen}
          />
        </CardContent>
      </Card>

      <BookingDialog
        escort={normalizedEscort}
        isOpen={bookingDialogOpen}
        onClose={() => setBookingDialogOpen(false)}
        onSubmit={bookingOnSubmit}
        onBookNow={onBookingOpen}
      />
    </div>
  );
};

export default ProfileInfo;

