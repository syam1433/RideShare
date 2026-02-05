import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  Plus,
  Car,
  TrendingUp,
  Star,
  Shield,
  Calendar,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { mockDriverRides } from "../data/mockData";
import { format } from "date-fns";

const DriverDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Rating",
      value: user?.rating || "4.8",
      icon: Star,
      color: "bg-yellow-500",
      change: "+0.2 this month",
    },
    {
      label: "Completed Rides",
      value: user?.completedRides || "156",
      icon: Car,
      color: "bg-blue-500",
      change: "+12 this month",
    },
    {
      label: "This Month",
      value: `₹${user?.earnings || "8,450"}`,
      icon: TrendingUp,
      color: "bg-green-500",
      change: "+18% from last",
    },
    {
      label: "Safety Score",
      value: `${user?.safetyScore || "98"}%`,
      icon: Shield,
      color: "bg-emerald-500",
      change: "Excellent",
    },
  ];

  const upcomingRides = mockDriverRides.filter(
    (ride) => ride.status === "upcoming"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 🚗
          </h1>
          <p className="text-gray-600">
            Your driver dashboard - manage your rides and earnings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Safety Compliance Card */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Safety Compliance</h3>
              <p className="text-green-100">
                Your AI safety verification status
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-100">Helmet Compliance</span>
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold">98%</p>
            </div>

            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-100">Overload Violations</span>
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold">0</p>
            </div>

            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-100">Last Check</span>
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold">Passed</p>
              <p className="text-xs text-green-100 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/post-ride"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Plus className="w-7 h-7 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Post New Ride
                </h3>
                <p className="text-sm text-gray-600">
                  Create a new ride offer for passengers
                </p>
              </div>
              <div className="text-green-600 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </Link>

          <Link
            to="/driver-dashboard"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Car className="w-7 h-7 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Active Rides
                </h3>
                <p className="text-sm text-gray-600">
                  Manage your ongoing and upcoming rides
                </p>
              </div>
              <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </Link>
        </div>

        {/* Upcoming Rides */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Rides</h2>
            <Link
              to="/post-ride"
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              + Add New
            </Link>
          </div>

          {upcomingRides.length > 0 ? (
            <div className="space-y-4">
              {upcomingRides.map((ride) => (
                <div
                  key={ride.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {ride.from} → {ride.to}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(ride.date), "MMM dd, yyyy")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {ride.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600 mb-1">
                        ₹{ride.earnings}
                      </p>
                      <p className="text-xs text-gray-500">Total Earnings</p>
                    </div>
                  </div>

                  {/* Passenger Info */}
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {ride.bookedSeats} / {ride.totalSeats} seats booked
                        </p>
                        {ride.passengers && ride.passengers.length > 0 && (
                          <div className="flex items-center gap-2 mt-2">
                            {ride.passengers.map((passenger, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <img
                                  src={passenger.avatar}
                                  alt={passenger.name}
                                  className="w-6 h-6 rounded-full border border-white"
                                />
                                <span className="text-xs text-gray-600">
                                  {passenger.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No upcoming rides
              </h3>
              <p className="text-gray-600 mb-4">
                Start earning by posting your first ride
              </p>
              <Link
                to="/post-ride"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                <Plus className="w-5 h-5" />
                Post a Ride
              </Link>
            </div>
          )}
        </div>

        {/* Vehicle Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Vehicle Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Vehicle Type</p>
              <p className="font-semibold text-gray-900">
                {user?.vehicleType || "Bike"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Vehicle Number</p>
              <p className="font-semibold text-gray-900">
                {user?.vehicleNumber || "AP 39 XY 1234"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Model</p>
              <p className="font-semibold text-gray-900">
                {user?.vehicleModel || "Honda Activa"}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">
              Verified Documents
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Driving License</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Vehicle RC</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Insurance</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Pollution Certificate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;
