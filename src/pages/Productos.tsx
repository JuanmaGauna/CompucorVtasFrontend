import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import api from "../api";

type Producto = {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
};

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/productos")
      .then((res) => {
      console.log("Productos recibidos:", res.data); // 👈 esto
      setProductos(res.data as Producto[]);
      setLoading(false);
    })
    
      .catch((err) => {
        console.error("Error al cargar productos", err);
        setError("No se pudieron cargar los productos.");
        setLoading(false);
      });
  }, []);

  const columns = [
    { header: "ID", accessor: "id" as keyof Producto },
    { header: "Nombre", accessor: "nombre" as keyof Producto },
    { header: "Precio", accessor: "precio" as keyof Producto, render: (p: Producto) => `$${p.precio.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` },
    { header: "Stock", accessor: "stock" as keyof Producto },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Productos</h2>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <DataTable columns={columns} data={productos} />}
    </div>
  );
}
