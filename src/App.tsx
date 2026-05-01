import {Routes, Route} from 'react-router-dom'
import ApplicationsPage from './pages/ApplicationsPage'
import SessionsPage from './pages/SessionsPage'
import ApplicationViewPage from './pages/ApplicationViewPage'
import Navbar from "./components/core/Navbar.tsx";

function App() {
  return (
    <div className="bg-base-200 min-h-screen">
      <Navbar/>

      <main className="p-4">
        <Routes>
          <Route path="/applications/id/:id" element={<ApplicationViewPage/>}/>
          <Route path="/applications" element={<ApplicationsPage/>}/>
          <Route path="/sessions" element={<SessionsPage/>}/>

          <Route path="*" element={<ApplicationsPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
