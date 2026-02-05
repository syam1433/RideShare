import { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Car,
  CheckCircle,
  Filter,
  Clock,
  Shield,
} from "lucide-react";
import { mockRides, mockLocations } from "../data/mockData";
import { Link } from "react-router";
import toast from "react-hot-toast";

const FindRide = () => {
  const [searchForm, setSearchForm] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
  });
  const [activeFilters, setActiveFilters] = useState({
    price: "all",
    time: "all",
    vehicleType: "all",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    toast.success("Searching for rides...");
  };

  const handleBookRide = (rideId) => {
    toast.success("Ride booked successfully! Check your dashboard.");
  };

  // Filter rides based on active filters
  const filteredRides = mockRides.filter((ride) => {
    if (activeFilters.vehicleType !== "all" && ride.vehicleType !== activeFilters.vehicleType) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find a Ride</h1>
          <p className="text-gray-600">Search for available rides in your area</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              {/* From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={searchForm.from}
                    onChange={(e) =>
                      setSearchForm({ ...searchForm, from: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select location</option>
                    {mockLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={searchForm.to}
                    onChange={(e) =>
                      setSearchForm({ ...searchForm, to: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select location</option>
                    {mockLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchForm.date}
                    onChange={(e) =>
                      setSearchForm({ ...searchForm, date: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Passengers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={searchForm.passengers}
                    onChange={(e) =>
                      setSearchForm({ ...searchForm, passengers: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "passenger" : "passengers"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Rides
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
          <div className="flex items-center gap-2 text-gray-700 font-medium whitespace-nowrap">
            <Filter className="w-5 h-5" />
            <span>Filters:</span>
          </div>
          
          {/* Vehicle Type Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveFilters({ ...activeFilters, vehicleType: "all" })}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeFilters.vehicleType === "all"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-green-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilters({ ...activeFilters, vehicleType: "Bike" })}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeFilters.vehicleType === "Bike"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-green-300"
              }`}
            >
              Bike
            </button>
            <button
              onClick={() => setActiveFilters({ ...activeFilters, vehicleType: "Car" })}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeFilters.vehicleType === "Car"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-green-300"
              }`}
            >
              Car
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-gray-900">{filteredRides.length}</span> rides
          </p>
        </div>

        {/* Ride Cards */}
        <div className="grid gap-6">
          {filteredRides.map((ride) => (
            <div
              key={ride.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Driver Info */}
                <div className="flex items-start gap-4">
                  <img
                    src={ride.driverAvatar}
                    alt={ride.driverName}
                    className="w-16 h-16 rounded-full border-2 border-green-100"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {ride.driverName}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500 mb-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-gray-900">
                        {ride.driverRating}
                      </span>
                    </div>
                    {ride.safetyChecked && (
                      <div className="flex items-center gap-1 text-green-600 text-xs">
                        <Shield className="w-4 h-4" />
                        <span>AI Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ride Details */}
                <div className="flex-1">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="font-semibold text-gray-900">
                          {ride.from}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="font-semibold text-gray-900">{ride.to}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{ride.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{ride.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      <span>
                        {ride.vehicleType} - {ride.vehicleModel}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{ride.seatsLeft} seats available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{ride.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-col items-end justify-between min-w-[140px]">
                  <div className="text-right mb-4">
                    <p className="text-3xl font-bold text-green-600">₹{ride.price}</p>
                    <p className="text-xs text-gray-500">per seat</p>
                  </div>

                  <div className="space-y-2 w-full">
                    {ride.seatsLeft > 0 ? (
                      <>
                        <button
                          onClick={() => handleBookRide(ride.id)}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          Book Now
                        </button>
                        <Link
                          to={`/ride/${ride.id}`}
                          className="block w-full text-center bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm"
                        >
                          View Details
                        </Link>
                      </>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed"
                      >
                        Fully Booked
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindRide;
