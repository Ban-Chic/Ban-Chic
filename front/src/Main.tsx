import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Router from "./router/Router";
import theme from "./styles/Theme";
import Layouts from "./layouts";

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("./mocks/worker.js");
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider theme={theme}>
      <Layouts>
        <GlobalStyles />
        <RouterProvider router={Router} />
      </Layouts>
    </ThemeProvider>
  );
});
