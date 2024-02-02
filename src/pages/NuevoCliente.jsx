import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";
import Swal from "sweetalert2";

// Define your action function
export async function action({ request }) {
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
  await agregarCliente(data);
  Swal.fire("Clientes Agregado", "El cliente se agrego correctamente", "success" );

  return redirect("/");



}

export const NuevoCliente = () => {
  const navigate = useNavigate();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900 ">Nuevo Clientes</h1>
      <p className="mt-5 text-gray-700">Llena el formulario</p>
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
          <Formulario 
          
          />
          <input
            type="submit"
            value="Registrar Cliente"
            className="bg-gray-800 w-full sm:w-auto uppercase text-xs rounded p-3 text-white font-bold "
          />
        </Form>
      </div>
    </>
  );
};
