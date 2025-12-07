import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import BlankLayout from './layouts/BlankLayout'
import AdminLayout from './layouts/AdminLayout'
import HomePage from './pages/Home/HomePage'
import CarsPage from './pages/Cars/CarsPage'
import CarDetailsPage from './pages/Cars/CarDetailsPage'
import AboutPage from './pages/About/AboutPage'
import ContactPage from './pages/Contact/ContactPage'
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import UserProfilePage from './pages/Profile/UserProfilePage'
import BookingsPage from './pages/Bookings/BookingsPage'
import PaymentPage from './pages/Payment/PaymentPage'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminCarsPage from './pages/Admin/AdminCarsPage'
import AdminBookingsPage from './pages/Admin/AdminBookingsPage'
import AdminUsersPage from './pages/Admin/AdminUsersPage'
import AdminReportsPage from './pages/Admin/AdminReportsPage'
import AdminSettingsPage from './pages/Admin/AdminSettingsPage'

function App() {
  return (
    <Routes>
      {/* Routes with Header and Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/car/:carId" element={<CarDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Route>

      {/* Routes without Header and Footer (Auth pages) */}
      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/cars" element={<AdminCarsPage />} />
        <Route path="/admin/bookings" element={<AdminBookingsPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/reports" element={<AdminReportsPage />} />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  )
}

export default App