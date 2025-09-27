import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TaskBoardProvider } from './context/TaskBoardProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskBoardProvider>
      <App />
    </TaskBoardProvider>
  </StrictMode>
);
