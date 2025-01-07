import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header.jsx';
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx'
import SearchAlbum from './components/SearchAlbum.jsx';
import CreateAlbum from './components/CreateAlbum.jsx';
import EditAlbum from './components/EditAlbum.jsx';
import TestFlex from './components/TestFlex.jsx';
import "./css/Footer.css"
import "./css/NavBar.css"
import "./css/Header.css"
import "./css/Content.css"

const queryClient = new QueryClient();
function App() {
  return (
    <Router>
      <div>
        <Header />
        <NavBar />
          <QueryClientProvider client = {queryClient}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search/albums" element={<SearchAlbum />} />
            <Route path="/create/album" element={<CreateAlbum />} />
            <Route path="/edit/album/:id/:artistName/:albumName/:yearReleased/:albumPrice" element={<EditAlbum />} />
            <Route path="/test" element={<TestFlex/>}/>
          </Routes>
        <ReactQueryDevtools />
        </QueryClientProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;