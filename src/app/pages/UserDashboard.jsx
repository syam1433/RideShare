import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  Search,
  Car,
  Leaf,
  Wallet,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import { mockUserRides } from "../data/mockData";
import { format } from "date-fns";

const UserDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      label: "Rides Taken",
      value: "24",
      icon: Car,
      color: "bg-blue-500",
      change: "+3 this month",
    },
    {
      label: "CO₂ Saved",
      value: "156 kg",
      icon: Leaf,
      color: "bg-green-500",
      change: "Great impact!",
    },
    {
      label: "Wallet Balance",
      value: "₹1,240",
      icon: Wallet,
      color: "bg-purple-500",
      change: "Add funds",
    },
    {
      label: "Money Saved",
      value: "₹4,800",
      icon: TrendingUp,
      color: "bg-orange-500",
      change: "vs solo rides",
    },
  ];

  const activeRide = mockUserRides.find((ride) => ride.status === "active");
  const upcomingRides = mockUserRides.filter(
    (ride) => ride.status === "upcoming"
  );
  const recentRides = mockUserRides.filter(
    (ride) => ride.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your rides today
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

        {/* Active Ride Alert */}
        {activeRide && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Car className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Active Ride</h3>
                  <p className="text-green-100">
                    {activeRide.from} → {activeRide.to}
                  </p>
                  <p className="text-sm text-green-100 mt-1">
                    Driver: {activeRide.driverName}
                  </p>
                </div>
              </div>
              <Link
                to={`/active-ride/${activeRide.rideId}`}
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Track Ride
              </Link>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/find-ride"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Search className="w-7 h-7 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Search for Rides
                </h3>
                <p className="text-sm text-gray-600">
                  Find the perfect ride for your journey
                </p>
              </div>
              <div className="text-green-600 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Calendar className="w-7 h-7 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  My Bookings
                </h3>
                <p className="text-sm text-gray-600">
                  View all your upcoming and past rides
                </p>
              </div>
              <div className="text-blue-600 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </div>
          </Link>
        </div>

        {/* Upcoming Rides */}
        {upcomingRides.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Upcoming Rides
            </h2>
            <div className="space-y-4">
              {upcomingRides.map((ride) => (
                <div
                  key={ride.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={ride.driverAvatar}
                    alt={ride.driverName}
                    className="w-14 h-14 rounded-full border-2 border-white shadow"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {ride.driverName}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {ride.from} → {ride.to}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {ride.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(ride.date), "MMM dd, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">
                      ₹{ride.price}
                    </p>
                    <Link
                      to={`/ride/${ride.rideId}`}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Rides */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recent Rides
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Driver
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Route
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentRides.map((ride) => (
                  <tr
                    key={ride.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={ride.driverAvatar}
                          alt={ride.driverName}
                          className="w-10 h-10 rounded-full"
                        />
                        <span className="font-medium text-gray-900">
                          {ride.driverName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {ride.from} → {ride.to}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {format(new Date(ride.date), "MMM dd, yyyy")}
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      ₹{ride.price}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Completed
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
