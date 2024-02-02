import Swal from "sweetalert2";
import Formulario from "../components/formulario";
import { obtenerCliente,actualizarCliente } from "../data/clientes";
import {  Form, useNavigate,useLoaderData, redirect, useActionData } from "react-router-dom";
import Error from "../components/Error";
export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);
  if (Object.values(cliente).length === 0) {
    throw new Resoponse("", { status: 404, statusText: "No hay resultados" });
  }

  return cliente;
}


export async function action({ request,params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");
  


  //validacion de datos
  const errores = [];
  if (Object.values(data).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }


  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if(!regex.test(email)) {
    errores.push("El email no es valido");
  }

  //retornar errores
  if (Object.keys(errores).length) {
    return errores;
  }
  await actualizarCliente(params.clienteId,data);
  Swal.fire("Clientes Actulizado", "El cliente se actualizo correctamente", "success" );

  return redirect("/");



}



export const EditarCliente = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
    <h1 className="font-black text-4xl text-blue-900 ">Editar Clientes</h1>
    <p className="mt-5 text-gray-700">Editando al usuario</p>
    <div className="flex justify-end">
      <button
        className="bg-blue-800 w-full sm:w-auto uppercase text-xs rounded py-2 px-5 mt-5 text-white font-bold"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
    </div>

    <div className="bg-white shadow rounded-md md:w:3/4 mx-auto px-5 py-10 mt-2">
      {errores?.length &&
        errores.map((error, index) => <Error key={index}>{error}</Error>)}
      <Form method="POST" noValidate>
        <Formulario cliente={cliente}
        
        />
        <input
          type="submit"
          value="Editar Cliente"
          className="bg-gray-800 w-full sm:w-auto uppercase text-xs rounded p-3 text-white font-bold "
        />
      </Form>
    </div>
  </>
  );
};
