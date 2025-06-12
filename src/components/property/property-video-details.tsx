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
        <h1 className="text-3xl font-bold mb-6">
          Beautiful Family Home in Downtown
        </h1>

        {/* Video Section */}
        <div className="mb-8">
          <PropertyVideoPlayer
            videos={propertyVideos}
            showPlaylist={true}
            className="mb-6"
          />
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">
              Property Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This stunning family home offers everything you need for modern
              living...
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Property Details</h3>
            <ul className="space-y-2">
              <li>
                <strong>Price:</strong> $750,000
              </li>
              <li>
                <strong>Bedrooms:</strong> 4
              </li>
              <li>
                <strong>Bathrooms:</strong> 3
              </li>
              <li>
                <strong>Square Feet:</strong> 2,400
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
