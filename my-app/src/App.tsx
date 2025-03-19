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
import AdminPage from './Pages/AdminPage';
import UserAdmin from './Components/AdminComp/UserAdmin';
import NewsAdmin from './Components/AdminComp/NewsAdmin';
import HistoryAdmin from './Components/AdminComp/HistoryAdmin';
import ForumAdmin from './Components/AdminComp/ForumAdmin';
import AdminRoute from './Components/AdminComp/AdminRoute';
import Statistics from './Components/AdminComp/Statistics';

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


        <Route path="/admin/*" element={<AdminRoute />}>
          <Route index element={<AdminPage />} />
          <Route path="users" element={<UserAdmin />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path='history' element={<HistoryAdmin/>}/>
          <Route path="forum" element={<ForumAdmin />} />
          <Route path="statisctic" element={<Statistics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
