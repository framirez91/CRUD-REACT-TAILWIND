import { Outlet, Link, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation(); // este hook nos da acceso a la ubicación actual

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 bg-blue-600 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">CRM Clientes</h2>
        <nav className="mt-10">
          <Link
            to="/"
            className={`text-2xl block mt-2 ${
              location.pathname === "/" ? "text-blue-300" : "text-white"
            }`}
          >
            Clientes
          </Link>
          <Link
            to="/clientes/nuevos"
            className={`text-2xl block mt-2 ${
              location.pathname === "/clientes/nuevos"
                ? "text-blue-300"
                : "text-white"
            }`}
          >
            Nuevo Cliente
          </Link>
        </nav>
      </aside>
      <main className="md:w-3/4 p-10 overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};
