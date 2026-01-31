import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from './pages/Employees.jsx';
import Tasks from './pages/Tasks.jsx';
export default function App() {
  return (
    // <AuthProvider>
    
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees/>} />
          <Route path="/tasks" element={<Tasks/>} />
        </Routes>
      </BrowserRouter>
    // </AuthProvider>
  );
}
