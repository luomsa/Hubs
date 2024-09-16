import { useRouteError } from "react-router-dom";

const HubErrorBoundary = () => {
  const error = useRouteError();
  console.log("error!!", error);
  return (
    <div>
      <h1>{error instanceof Error && error.message}</h1>
    </div>
  );
};
export default HubErrorBoundary;
