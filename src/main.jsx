import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/layout";
import {
  NuevoCliente,
  action as NuevoClienteAction,
} from "./pages/NuevoCliente";
import { Index, loader as clientesLoader } from "./pages/Index";
import ErrorScreen from "./components/ErrorScreen";
import {EditarCliente, loader as editarClientesLoader, action as editarClientesAction} from "./pages/editarCliente";
import { action as eliminarClienteAction } from "./components/Cliente";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientesLoader,
        errorElement: <ErrorScreen />,
      },
      {
        path: "/clientes/nuevos",
        element: <NuevoCliente />,
        action: NuevoClienteAction,
        errorElement: <ErrorScreen />,
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente />,
        loader: editarClientesLoader,
        errorElement: <ErrorScreen />,
        action: editarClientesAction,

      },
      {
        path: "/clientes/:clienteId/eliminar",
        action : eliminarClienteAction,
        
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
