
import { Routes, Route } from 'react-router-dom'
import { PATHS } from './path.js'

import Login_page from './Component/Login_page.jsx'
import Register_page from './Component/Register_page.jsx'
import Home from './Component/Home.jsx'

function App() {
  return (
    <Routes>
      <Route
        path={PATHS.LOGIN}
        element={<Login_page />}
      />

      <Route
        path={PATHS.REGISTER}
        element={<Register_page />}
      />

      <Route
        path={PATHS.HOME}
        element={<Home />}
      />
    </Routes>
  )
}

export default App
