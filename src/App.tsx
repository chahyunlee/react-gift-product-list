import { Global } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reset from "@/styles/reset";
import Layout from "@/layout/Layout";
import { Routes } from "@/routes/routes";

function App() {
  return (
    <>
      <Global styles={reset} />
      <Layout>
        <Routes />
      </Layout>
      <ToastContainer position="bottom-center" autoClose={3000} />
    </>
  );
}

export default App;
