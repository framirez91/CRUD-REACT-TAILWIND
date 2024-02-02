import { useRouteError } from "react-router-dom";

export default function ErrorScreen() {
  const error = useRouteError();

  return <div>

    <h1 className=" text-center text-6xl">ERROR EN CRM</h1>
    <h3 className="text-center">{error.message || error.status}</h3>
  </div>;
}
