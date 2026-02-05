import { useState } from "react";
import { useNavigate } from "react-router";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Car,
  Upload,
  Shield,
  AlertCircle,
} from "lucide-react";
import { mockLocations } from "../data/mockData";
import toast from "react-hot-toast";

const PostRide = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: "1",
    pricePerSeat: "",
    vehicleType: "Bike",
    safetyNote: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.from || !formData.to || !formData.date || !formData.time || !formData.pricePerSeat) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Success
    toast.success("Ride posted! AI verification in progress...", {
      duration: 3000,
    });

    setTimeout(() => {
      toast.success("✓ AI Safety Check Passed! Your ride is now live.");
      navigate("/driver-dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a Ride</h1>
          <p className="text-gray-600">
            Share your journey and earn while helping others
          </p>
        </div>

        {/* Safety Info Banner */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 flex items-start gap-3">
          <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-green-900 mb-1">
              AI Safety Verification
            </h3>
            <p className="text-sm text-green-700">
              Your ride will be automatically verified for helmet compliance and
              vehicle safety before going live. This usually takes 2-3 minutes.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Route Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Route Details
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* From */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select starting point</option>
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
                    To <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="to"
                      value={formData.to}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select destination</option>
                      {mockLocations.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Date & Time
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ride Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ride Details
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {/* Seats */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Seats <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="seats"
                      value={formData.seats}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "seat" : "seats"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Seat (₹) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="pricePerSeat"
                      value={formData.pricePerSeat}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="80"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      name="vehicleType"
                      value={formData.vehicleType}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Bike">Bike</option>
                      <option value="Scooter">Scooter</option>
                      <option value="Car">Car</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Vehicle Photo (Optional)
              </h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {selectedImage ? (
                  <div>
                    <img
                      src={selectedImage}
                      alt="Preview"
                      className="max-h-48 mx-auto rounded-lg mb-4"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label htmlFor="photo" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-1">
                      Click to upload vehicle photo
                    </p>
                    <p className="text-sm text-gray-400">
                      PNG, JPG up to 10MB (AI will verify)
                    </p>
                  </label>
                )}
              </div>
            </div>

            {/* Safety Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Safety Note (Optional)
              </label>
              <textarea
                name="safetyNote"
                value={formData.safetyNote}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Helmets will be provided for all passengers"
              ></textarea>
            </div>

            {/* Warning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Important Guidelines</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Ensure all passengers wear helmets (for 2-wheelers)</li>
                  <li>Do not exceed vehicle capacity</li>
                  <li>Follow all traffic rules and safety regulations</li>
                  <li>Arrive on time at pickup points</li>
                </ul>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Post Ride & Verify
              </button>
              <button
                type="button"
                onClick={() => navigate("/driver-dashboard")}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostRide;
