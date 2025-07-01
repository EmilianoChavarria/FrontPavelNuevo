import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/shared/Navbar'
import { ProjectsView } from './views/Projects/ProjectsView'
import { CategoriesView } from './views/Categories/CategoriesView'
import { UsersView } from './views/Users/UsersView'
import { GanttChart } from './components/projects/GanttCHart'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-blue-100 dark:bg-[#0d1117]">
      <Navbar />
      <div className="flex-1 overflow-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <Routes>
            <Route path="/" element={<ProjectsView />} />
            <Route path="/project/:projectId/stages" element={<CategoriesView />} />
            <Route path="/users" element={<UsersView />} />
            <Route path="/gantt/:projectId" element={<GanttChart />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App