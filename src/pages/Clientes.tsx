import { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import api from "../api";

type Cliente = {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
};

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/clientes")
      .then((res) => {
        if (res && res.data) {
          setClientes(res.data as Cliente[]);
        } else {
          throw new Error("Respuesta inválida del servidor.");
        }
      })
      .catch(() => {
        setError("No se pudieron cargar los clientes.");
      })
      .then(() => {
        setLoading(false);
      });
  }, []);
  
  
  

  const columns = [
    { header: "ID", accessor: "id" as keyof Cliente },
    { header: "Nombre", accessor: "nombre" as keyof Cliente },
    { header: "Email", accessor: "email" as keyof Cliente },
    { header: "Teléfono", accessor: "telefono" as keyof Cliente },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Clientes</h2>
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && <DataTable columns={columns} data={clientes} />}
    </div>
  );
}
