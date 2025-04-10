import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Chat from './pages/chat'
import { ErrorFallback } from './components/ErrorFallback'
import { Layout } from './layout'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Chat />} />
          <Route path="/phone" element={<Chat />} />
          <Route path="/phone/:phoneId" element={<Chat />} />
          <Route
            path="*"
            element={<ErrorFallback message="Page not found" />}
          />
        </Route>
      </Routes>
    </Router>
  )
}
