import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/shared/Navbar'
import { ProjectsView } from './views/Projects/ProjectsView'
import { CategoriesView } from './views/Categories/CategoriesView'
import { UsersView } from './views/Users/UsersView'

function App() {

  return (
    <>
      <Navbar />
      <div className='bg-blue-100 py-8'>
        <div className=' h-screen max-w-7xl mx-auto'>
          <Routes>
            <Route path="/" element={<ProjectsView />} />
            <Route path="/project/:projectId/stages" element={<CategoriesView />} />
            <Route path="/users" element={<UsersView />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>

        </div>
      </div>
    </>
  )
}

export default App
