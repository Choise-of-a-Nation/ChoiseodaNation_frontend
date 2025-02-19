import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import RegLog from './Pages/RegLog';
import Profile from './Pages/Profile';
import ForumPage from './Pages/ForumPage';
import TopicPage from './Pages/TopicPage';
import NewTopicPage from './Pages/NewTopicPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<RegLog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/forum/new-topic" element={<NewTopicPage />} />
        <Route path="/forum/:topicId" element={<TopicPage />} />
      </Routes>
    </Router>
  );
}

export default App;
