
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import TicketPage from './pages/Tickets';
import { AuthProvider } from './context/AuthContext';
import ProtectedRouteGuard from './components/ProtectedRoute';
import TopMenu from './components/TopMenu';
import Profile from './pages/Profile';
import DetailTicket from './pages/Tickets/DetailTicket';
import CreateTicket from './pages/Tickets/CreateTicket';

function App() {
  return (
    <AuthProvider>
      <Router>
        <TopMenu />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tickets" element={<ProtectedRouteGuard> <TicketPage /></ProtectedRouteGuard>} />
          <Route path="/profile" element={<ProtectedRouteGuard> <Profile /></ProtectedRouteGuard>} />
          <Route path="/create-ticket" element={<ProtectedRouteGuard> <CreateTicket /></ProtectedRouteGuard>} />
          <Route path="/tickets/:id" element={<ProtectedRouteGuard> <DetailTicket /></ProtectedRouteGuard>} />
          <Route index path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router >
    </AuthProvider>

  );
}

export default App;