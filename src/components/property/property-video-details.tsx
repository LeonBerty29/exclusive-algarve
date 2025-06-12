import { PropertyVideoPlayer } from "./property-video-player";

// Example property data structure
const propertyVideos = [
  {
    id: "1",
    url: "/videos/hero-video-1.mp4", // or external URL
    title: "Complete Property Tour",
    duration: "3:45",
  },
  {
    id: "2",
    url: "/videos/hero-video-2.mp4",
    title: "Kitchen & Dining Area",
    duration: "1:30",
  },
  {
    id: "3",
    url: "/videos/hero-video-3.mp4",
    title: "Bedrooms & Bathrooms",
    duration: "2:15",
  },
  {
    id: "4",
    url: "/videos/hero-video-2.mp4",
    title: "Garden & Outdoor Space",
    duration: "1:45",
  },
];

export default function PropertyVideoDetails() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Video Section */}
        <div className="mb-8">
          <PropertyVideoPlayer
            videos={propertyVideos}
            showPlaylist={true}
            className="mb-6"
          />
        </div>

        
      </div>
    </div>
  );
}
