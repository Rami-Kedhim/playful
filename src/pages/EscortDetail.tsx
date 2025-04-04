
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Escort } from "@/types/escort";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import EscortProfile from "@/components/escorts/detail/EscortProfile";
import { BookingForm } from "@/components/escorts/detail/booking";

// Dummy data fetch function - replace with real API call later
const fetchEscortById = async (id: string): Promise<Escort | null> => {
  // For MVP, we'll return dummy data
  // Later, implement with Supabase fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: "Sophia Rose",
        age: 28,
        location: "London, UK",
        price: 200,
        imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1064&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1287&auto=format&fit=crop"
        ],
        videos: [
          "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f62a0900e1133dd188183763ecf181ccf3&profile_id=139&oauth2_token_id=57447761",
          "https://player.vimeo.com/external/394678700.sd.mp4?s=353646e34d7bde02ad638c7308a198786e0dff8f&profile_id=164&oauth2_token_id=57447761"
        ],
        rating: 4.8,
        reviews: 24,
        tags: ["GFE", "Massage", "Dinner Date"],
        description: "I'm Sophia, a sophisticated companion available for dinner dates, weekend getaways, and intimate encounters. I pride myself on creating an authentic connection and unforgettable experiences.",
        verified: true,
        gender: "female",
        sexualOrientation: "bisexual",
        availableNow: true,
        lastActive: "2023-05-15T14:30:00Z",
        responseRate: 95,
        languages: ["English", "French", "Spanish"],
        height: "170cm",
        weight: "58kg",
        measurements: "34C-26-36",
        hairColor: "blonde",
        eyeColor: "blue",
        ethnicity: "Caucasian",
        availability: {
          days: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
          hours: "19:00 - 04:00"
        },
        services: ["massage", "companionship", "dinner date", "overnight", "gfe"],
        rates: {
          hourly: 200,
          twoHours: 350,
          overnight: 1200,
          weekend: 2500
        },
        contactInfo: {
          phone: "+44123456789",
          email: "sophia@example.com"
        },
        verificationLevel: "enhanced",
        hasVirtualContent: true,
        providesInPersonServices: true,
        providesVirtualContent: true, // Added the missing property
        contentStats: {
          photos: 45,
          videos: 12,
          streams: 3
        },
        providesLiveStreams: true, // Added since it might be used
        isAIGenerated: false, // Added since it might be used
        virtualUsername: "sophia_london", // Added since hasVirtualContent is true
        boostScore: 85 // Added optional property
      });
    }, 1000);
  });
};

const EscortDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [escort, setEscort] = useState<Escort | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchEscortById(id)
        .then(data => {
          setEscort(data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching escort:", error);
          setLoading(false);
        });
    }
  }, [id]);
  
  const handleBookNow = () => {
    setBookingFormOpen(true);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton className="h-96 w-full rounded-xl mb-4" />
            <div className="grid grid-cols-3 gap-2 mb-6">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
          <div>
            <Skeleton className="h-40 w-full rounded-xl mb-4" />
            <Skeleton className="h-20 w-full rounded-lg mb-4" />
            <Skeleton className="h-60 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!escort) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The escort profile you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/escorts">Back to Escorts</a>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <EscortProfile 
        escort={escort} 
        onBookNow={handleBookNow} 
      />
      
      {bookingFormOpen && (
        <BookingForm
          escort={escort}
          isOpen={bookingFormOpen}
          onClose={() => setBookingFormOpen(false)}
          onSubmit={(data) => {
            console.log("Booking submitted:", data);
            setBookingFormOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default EscortDetail;
