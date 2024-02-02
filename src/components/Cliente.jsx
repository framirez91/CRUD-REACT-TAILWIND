import { Form, redirect, useNavigate } from "react-router-dom";
import { eliminarCliente } from "../data/clientes";

export async function action({ params }) {
  await eliminarCliente(params.clienteId);
  return redirect(`/`);
}

export const Cliente = ({ cliente }) => {
  const { nombre, empresa, email, telefono, id } = cliente;
  const navigate = useNavigate();

  return (
    <>
      <tr>
        <td className="border px-4 py-2 text-center">{nombre}</td>
        <td className="border px-4 py-2 text-center">{empresa}</td>
        <td className="border px-4 py-2 text-center">{email}</td>
        <td className="border px-4 py-2 text-center">{telefono}</td>
        <td className="border px-4 py-2 text-center">
          <Form
            method="post"
            action={`/clientes/${id}/eliminar`}
            onSubmit={(e)=> { if (!window.confirm("¿Estás seguro de eliminar este cliente?")) {
              e.preventDefault();
            }
          }}

           
          >
            <button
              type="submit"
              className="flex justify-center items-center bg-red-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold "
            >
              Eliminar
            </button>
          </Form>
          <button
            type="button"
            className="flex justify-center items-center mt-1 bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
            onClick={() => {
              navigate(`/clientes/${id}/editar`);
            }}
          >
            Editar
          </button>
        </td>
      </tr>
    </>
  );
};
