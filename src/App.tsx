import { Route, Routes } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage";
import SessionsPage from "./pages/SessionsPage";
import ApplicationViewPage from "./pages/ApplicationViewPage";
import Navbar from "./components/core/Navbar.tsx";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-accent/10 via-base-100 to-primary/20">
      <Navbar />

      <main className="p-4">
        <Routes>
          <Route
            path="/applications/id/:id"
            element={<ApplicationViewPage />}
          />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/sessions" element={<SessionsPage />} />

          <Route path="*" element={<ApplicationsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
