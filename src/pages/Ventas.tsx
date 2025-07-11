import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import api from "../api";

type Venta = {
  id: number;
  clienteNombre: string;
  fecha: string;
  total: number;
};

export default function Ventas() {
  const [ventas, setVentas] = useState<Venta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/ventas")
      .then((res) => {
        setVentas(res.data as Venta[]);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar las ventas.");
        setLoading(false);
      });
  }, []);

  const columns = [
    { header: "ID", accessor: "id" as keyof Venta },
    { header: "Cliente", accessor: "clienteNombre" as keyof Venta },
    { header: "Fecha", accessor: "fecha" as keyof Venta },
    { header: "Total", accessor: "total" as keyof Venta },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ventas</h2>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <DataTable columns={columns} data={ventas} />}
    </div>
  );
}
