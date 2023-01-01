import { BrowserRouter } from "react-router-dom";
import { AuthorizerProvider } from "@authorizerdev/authorizer-react";
import App from "./App";

export default function Root() {
  return (
    <BrowserRouter>
      <AuthorizerProvider
        config={{
          authorizerURL: "https://authorizer-production-6455.up.railway.app",
          redirectURL: window.location.origin,
          clientID: "ee3b1e66-947b-4646-999e-0e663ab47efe",
        }}
      >
        <App />
      </AuthorizerProvider>
    </BrowserRouter>
  );
}
