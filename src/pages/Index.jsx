import { useLoaderData } from "react-router-dom";
import { Cliente } from "../components/Cliente";
import { obtenerClientes } from "../data/clientes";

export function loader() {
  const clientes = obtenerClientes();
 return clientes;
  
}

export const Index = () => {
  const clientes = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">Clientes</h1>
      <p className="mt-5 text-gray-700">Administra Tus clientes</p>
      {clientes.length > 0 ? (
        <table className="table-auto mt-10 w-full">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Teléfono</th>
              <th className="w-1/5 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {clientes.map((cliente) => (
              <Cliente key={cliente.id} cliente={cliente} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-5 text-gray-700">No hay clientes</p>
      )}
    </>
  );
};
