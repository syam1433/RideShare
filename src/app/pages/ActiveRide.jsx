import { useParams, Link } from "react-router";
import {
  Phone,
  MessageCircle,
  AlertTriangle,
  Navigation,
  MapPin,
  Clock,
  User,
  Star,
  Shield,
  Share2,
} from "lucide-react";
import MapPlaceholder from "../components/MapPlaceholder";
import { mockRides } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ActiveRide = () => {
  const { id } = useParams();
  const { isDriver } = useAuth();
  const ride = mockRides.find((r) => r.id === id);

  if (!ride) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ride not found
          </h2>
          <Link to="/dashboard" className="text-green-600 hover:text-green-700">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleSOS = () => {
    toast.error("🚨 SOS Alert Sent! Emergency services notified.", {
      duration: 5000,
    });
  };

  const handleShare = () => {
    toast.success("Trip details shared with emergency contacts");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Active Ride</h1>
            <p className="text-sm text-gray-600">
              {ride.from} → {ride.to}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share Trip</span>
            </button>
            <button
              onClick={handleSOS}
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-lg"
            >
              <AlertTriangle className="w-5 h-5" />
              SOS
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <MapPlaceholder from={ride.from} to={ride.to} className="h-96" />

            {/* Trip Progress */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Trip Progress
              </h2>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>On the way...</span>
                  <span>45% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>

              {/* Route Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{ride.from}</h3>
                    <p className="text-sm text-gray-600">Pickup - Completed</p>
                    <p className="text-xs text-green-600 mt-1">
                      ✓ Started at {ride.time}
                    </p>
                  </div>
                </div>

                <div className="ml-5 border-l-2 border-dashed border-gray-300 h-8"></div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">En Route</h3>
                    <p className="text-sm text-gray-600">Currently traveling</p>
                    <p className="text-xs text-blue-600 mt-1">
                      ETA: 25 minutes
                    </p>
                  </div>
                </div>

                <div className="ml-5 border-l-2 border-dashed border-gray-300 h-8"></div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-500">{ride.to}</h3>
                    <p className="text-sm text-gray-400">Destination</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Trip Chat
              </h2>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">
                  Chat with your {isDriver ? "passengers" : "driver"}
                </p>
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Open Chat
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Driver/Passenger Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {isDriver ? "Passenger Info" : "Driver Info"}
              </h2>
              
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={ride.driverAvatar}
                  alt={ride.driverName}
                  className="w-16 h-16 rounded-full border-2 border-green-100"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {ride.driverName}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500 mt-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-900">
                      {ride.driverRating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="font-medium text-gray-900">
                    {ride.vehicleModel}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Vehicle No.</span>
                  <span className="font-medium text-gray-900">
                    {ride.vehicleNumber}
                  </span>
                </div>
                {ride.helmetCompliance && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <Shield className="w-4 h-4" />
                    <span>Helmet Verified</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors">
                  <Phone className="w-5 h-5" />
                  Call
                </button>
                <button className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  Chat
                </button>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Trip Details
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-medium text-gray-900">
                    {ride.distance}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium text-gray-900">
                    {ride.duration}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fare</span>
                  <span className="font-semibold text-green-600 text-lg">
                    ₹{ride.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Safety Features */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8" />
                <h2 className="text-lg font-bold">Safety Features</h2>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  ✓ Live GPS tracking
                </li>
                <li className="flex items-center gap-2">
                  ✓ Emergency SOS button
                </li>
                <li className="flex items-center gap-2">
                  ✓ Trip sharing with contacts
                </li>
                <li className="flex items-center gap-2">
                  ✓ 24/7 support available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveRide;
