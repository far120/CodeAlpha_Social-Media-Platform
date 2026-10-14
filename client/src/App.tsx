import AppRouter from "./app/router/AppRouter";
import QueryProvider from "./app/providers/QueryProvider";
import { ToastProvider } from "./components/Feedback/Toast";
import { ThemeProvider } from "./app/providers/ThemeProvider";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ToastProvider>
          <AppRouter />
        </ToastProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}

export default App;