import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// Public / Auth
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User pages
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import AddPet from "./pages/AddPet";
import About from "./pages/About";
import MyAdoptions from "./pages/MyAdoptions";
import MyFavorites from "./pages/MyFavorites";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import UserNotifications from "./pages/UserNotifications";
import UserSupport from "./pages/UserSupport";
import NearbyShelters from "./pages/NearbyShelters";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminPets from "./pages/AdminPets";
import AdminUsers from "./pages/AdminUsers";
import AdminAdoptions from "./pages/AdminAdoptions";
import AdminAddPet from "./pages/AdminAddPet";
import AdminRequests from "./pages/AdminRequests";
import AdminReports from "./pages/AdminReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* "/" = Landing page — always visible, even when logged in */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/pets" element={<AdminLayout><AdminPets /></AdminLayout>} />
        <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
        <Route path="/admin/adoptions" element={<AdminLayout><AdminAdoptions /></AdminLayout>} />
        <Route path="/admin/add-pet" element={<AdminLayout><AdminAddPet /></AdminLayout>} />
        <Route path="/admin/requests" element={<AdminLayout><AdminRequests /></AdminLayout>} />
        <Route path="/admin/reports" element={<AdminLayout><AdminReports /></AdminLayout>} />

        {/* User (protected) */}
        <Route path="/home" element={<ProtectedRoute><Layout><Home /></Layout></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Layout><UserDashboard /></Layout></ProtectedRoute>} />
        <Route path="/pets" element={<ProtectedRoute><Layout><Pets /></Layout></ProtectedRoute>} />
        <Route path="/pets/:id" element={<ProtectedRoute><Layout><PetDetails /></Layout></ProtectedRoute>} />
        <Route path="/add-pet" element={<ProtectedRoute><Layout><AddPet /></Layout></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><Layout><About /></Layout></ProtectedRoute>} />
        <Route path="/my-adoptions" element={<ProtectedRoute><Layout><MyAdoptions /></Layout></ProtectedRoute>} />
        <Route path="/my-favorites" element={<ProtectedRoute><Layout><MyFavorites /></Layout></ProtectedRoute>} />
        <Route path="/adoption-requests" element={<ProtectedRoute><Layout><MyAdoptions /></Layout></ProtectedRoute>} />
        <Route path="/shelters" element={<ProtectedRoute><Layout><NearbyShelters /></Layout></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Layout><UserNotifications /></Layout></ProtectedRoute>} />
        <Route path="/support" element={<ProtectedRoute><Layout><UserSupport /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><UserProfile /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><UserSettings /></Layout></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
