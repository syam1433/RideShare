import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for existing user
    const storedUser = localStorage.getItem("rideshare_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Fake login logic
    const isDriver = email.toLowerCase().includes("driver");
    const mockUser = {
      id: isDriver ? "driver_001" : "user_001",
      name: isDriver ? "Ramesh Kumar" : "Priya Sharma",
      email: email,
      role: isDriver ? "driver" : "user",
      phone: isDriver ? "+91 98765 43210" : "+91 98123 45670",
      avatar: isDriver
        ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh"
        : "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      rating: isDriver ? 4.8 : 4.5,
      joinedDate: "2024-01-15",
      verified: true,
      ...(isDriver && {
        vehicleType: "Bike",
        vehicleNumber: "AP 39 XY 1234",
        vehicleModel: "Honda Activa",
        completedRides: 156,
        earnings: 45600,
        safetyScore: 98,
      }),
    };

    setUser(mockUser);
    localStorage.setItem("rideshare_user", JSON.stringify(mockUser));
    return mockUser;
  };

  const register = (formData) => {
    // Fake registration logic
    const mockUser = {
      id: formData.role === "driver" ? "driver_new" : "user_new",
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone || "+91 98000 00000",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
      rating: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      verified: false,
      ...(formData.role === "driver" && {
        vehicleType: formData.vehicleType || "Bike",
        vehicleNumber: formData.vehicleNumber || "",
        vehicleModel: formData.vehicleModel || "",
        completedRides: 0,
        earnings: 0,
        safetyScore: 100,
      }),
    };

    setUser(mockUser);
    localStorage.setItem("rideshare_user", JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("rideshare_user");
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
    isDriver: user?.role === "driver",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
