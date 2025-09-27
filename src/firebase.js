
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
  apiKey: 'AIzaSyA6GD-tq1l41SEpPmI2REAqATYttv-ybb8',
  authDomain: 'dynamic-task-board.firebaseapp.com',
  databaseURL: 'https://dynamic-task-board-default-rtdb.firebaseio.com',
  projectId: 'dynamic-task-board',
  storageBucket: 'dynamic-task-board.firebasestorage.app',
  messagingSenderId: '162739698513',
  appId: '1:162739698513:web:1d6feb7dfd7d731112f170',
  measurementId: 'G-16L2LM9JH7',
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
