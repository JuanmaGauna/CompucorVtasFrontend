import { Link, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Inicio from "./Inicio";
import Productos from "./Productos";
import Clientes from "./Clientes";
import Ventas from "./Ventas";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [section, setSection] = useState("inicio");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Detecta el path actual y ajusta el estado del menú activo
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    setSection(path || "inicio");
  }, [location]);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Menú lateral */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">AdminVentas</h2>
        <ul>
            <li className={`mb-4 cursor-pointer px-2 py-1 rounded ${
            section === "inicio" ? "bg-blue-700 font-bold" : "hover:bg-gray-700"
                                                                                    }`}>
                    <Link to="/dashboard/inicio">Inicio</Link>
                    </li>
                    <li className={`mb-4 cursor-pointer px-2 py-1 rounded ${
            section === "productos" ? "bg-blue-700 font-bold" : "hover:bg-gray-700"
                                                                                    }`}>
                    <Link to="/dashboard/productos">Productos</Link>
                    </li>
                    <li className={`mb-4 cursor-pointer px-2 py-1 rounded ${
            section === "clientes" ? "bg-blue-700 font-bold" : "hover:bg-gray-700"
                                                                                    }`}>
                    <Link to="/dashboard/clientes">Clientes</Link>
                    </li>
                    <li className={`mb-4 cursor-pointer px-2 py-1 rounded ${
            section === "ventas" ? "bg-blue-700 font-bold" : "hover:bg-gray-700"
                                                                                    }`}>
                    <Link to="/dashboard/ventas">Ventas</Link>
                    </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/inicio" />} />
          <Route path="inicio" element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="ventas" element={<Ventas />} />
        </Routes>
      </main>

      {/* Modal de logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              ¿Cerrar sesión?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
