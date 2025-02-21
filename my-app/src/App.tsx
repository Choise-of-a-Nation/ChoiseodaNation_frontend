import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import RegLog from './Pages/RegLog';
import Profile from './Pages/Profile';
import ForumPage from './Pages/ForumPage';
import TopicPage from './Pages/TopicPage';
import NewTopicPage from './Pages/NewTopicPage';
import NewsPage from './Pages/NewsPage';
import NewPage from './Pages/NewPage';
import WikiPage from './Pages/WikiPage';
import WikPage from './Pages/WikPage';

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
        <Route path='/news' element={<NewsPage/>}/>
        <Route path='/news/:newId' element={<NewPage/>}/>
        <Route path='/history' element={<WikiPage/>}/>
        <Route path='/history/:wikId' element={<WikPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
