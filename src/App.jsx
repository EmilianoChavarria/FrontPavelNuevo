import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/shared/Navbar'
import { ProjectsView } from './views/Projects/ProjectsView'
import { CategoriesView } from './views/Categories/CategoriesView'
import { UsersView } from './views/Users/UsersView'
import { GanttChart } from './components/projects/GanttCHart'

function App() {

  return (
    <>
      <Navbar />
      <div className="bg-blue-100 dark:bg-[#0d1117] py-8 ">
        <div className=' h-screen max-w-7xl mx-auto px-10 xl:px-0'>
          <Routes>
            <Route path="/" element={<ProjectsView />} />
            <Route path="/project/:projectId/stages" element={<CategoriesView />} />
            <Route path="/users" element={<UsersView />} />
            <Route path="/gantt/:projectId" element={<GanttChart />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>

        </div>
      </div>
    </>
  )
}

export default App
