import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
// import Login from "./pages/Login.jsx";
export default function App() {
  return (
    // <AuthProvider>
    
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Register />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    // </AuthProvider>
  );
}
