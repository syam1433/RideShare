import { useParams, Link, useNavigate } from "react-router";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Shield,
  Car,
  CheckCircle,
  ArrowLeft,
  MessageCircle,
  Phone,
} from "lucide-react";
import MapPlaceholder from "../components/MapPlaceholder";
import { mockRides } from "../data/mockData";
import toast from "react-hot-toast";

const RideDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ride = mockRides.find((r) => r.id === id);

  if (!ride) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ride not found
          </h2>
          <Link
            to="/find-ride"
            className="text-green-600 hover:text-green-700"
          >
            Back to Find Rides
          </Link>
        </div>
      </div>
    );
  }

  const handleBookRide = () => {
    toast.success("Ride booked successfully!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/find-ride"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to search</span>
        </Link>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <MapPlaceholder from={ride.from} to={ride.to} className="h-80" />

            {/* Route Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Trip Details
              </h2>

              {/* Route */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Pickup Point</p>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {ride.from}
                    </h3>
                  </div>
                </div>

                <div className="ml-6 border-l-2 border-dashed border-gray-300 h-8"></div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Drop Point</p>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {ride.to}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Date, Time, Distance */}
              <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">Date</span>
                  </div>
                  <p className="font-semibold text-gray-900">{ride.date}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">Time</span>
                  </div>
                  <p className="font-semibold text-gray-900">{ride.time}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">Distance</span>
                  </div>
                  <p className="font-semibold text-gray-900">{ride.distance}</p>
                </div>
              </div>
            </div>

            {/* Driver Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                About Driver
              </h2>

              <div className="flex items-start gap-6">
                <img
                  src={ride.driverAvatar}
                  alt={ride.driverName}
                  className="w-20 h-20 rounded-full border-4 border-green-100"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {ride.driverName}
                    </h3>
                    {ride.safetyChecked && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500 mb-4">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-lg font-semibold text-gray-900">
                      {ride.driverRating}
                    </span>
                    <span className="text-sm text-gray-600 ml-2">
                      (245 rides)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Vehicle</p>
                      <p className="font-medium text-gray-900">
                        {ride.vehicleModel}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Vehicle Number</p>
                      <p className="font-medium text-gray-900">
                        {ride.vehicleNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety Badges */}
              {ride.safetyChecked && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Safety Verified
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {ride.helmetCompliance && (
                      <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
                        <Shield className="w-4 h-4" />
                        <span>Helmet Verified</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Documents Verified</span>
                    </div>
                    <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Background Checked</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6">
              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <p className="text-gray-600 mb-2">Price per seat</p>
                <p className="text-4xl font-bold text-green-600">₹{ride.price}</p>
              </div>

              {/* Ride Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Car className="w-4 h-4" />
                    <span>Vehicle Type</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {ride.vehicleType}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>Seats Available</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {ride.seatsLeft} / {ride.totalSeats}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Duration</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {ride.duration}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              {ride.seatsLeft > 0 ? (
                <button
                  onClick={handleBookRide}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg font-semibold hover:shadow-xl transition-all mb-3"
                >
                  Book This Ride
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-4 rounded-lg font-semibold cursor-not-allowed mb-3"
                >
                  Fully Booked
                </button>
              )}

              {/* Contact Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-3 rounded-lg hover:bg-blue-100 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Chat</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-green-50 text-green-600 py-3 rounded-lg hover:bg-green-100 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">Call</span>
                </button>
              </div>

              {/* Safety Note */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900 mb-1">
                      Your safety is our priority
                    </p>
                    <p className="text-xs">
                      All rides are AI-verified for safety compliance. Share
                      your trip with family for added security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;
