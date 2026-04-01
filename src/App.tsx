import { Routes, Route } from 'react-router-dom'
import ApplicationsPage from './pages/ApplicationsPage'
import SessionsPage from './pages/SessionsPage'
import Navbar from "./components/core/Navbar.tsx";

function App() {
  return (
    <div className="bg-base-100 min-h-screen">
      <Navbar />

      <main className="p-4">
        <Routes>
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/sessions" element={<SessionsPage />} />

          <Route path="*" element={<ApplicationsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
