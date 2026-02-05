import { MapPin, Navigation } from "lucide-react";

const MapPlaceholder = ({ from, to, className = "" }) => {
  return (
    <div
      className={`bg-gradient-to-br from-green-100 via-emerald-100 to-blue-100 rounded-xl flex items-center justify-center relative overflow-hidden ${className}`}
    >
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 h-full">
          {[...Array(64)].map((_, i) => (
            <div key={i} className="border border-green-500"></div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center p-8">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <MapPin className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Google Maps Integration
        </h3>
        <p className="text-gray-600 mb-4">Real-time tracking would appear here</p>
        {from && to && (
          <div className="bg-white rounded-lg p-4 inline-block shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="font-medium text-gray-900">{from}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <Navigation className="w-4 h-4 text-gray-400" />
              <div className="h-8 border-l-2 border-dashed border-gray-300"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="font-medium text-gray-900">{to}</span>
            </div>
          </div>
        )}
      </div>

      {/* Animated Marker */}
      <div className="absolute top-1/4 left-1/3 animate-pulse">
        <div className="w-8 h-8 bg-red-500 rounded-full shadow-lg flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
};

export default MapPlaceholder;
