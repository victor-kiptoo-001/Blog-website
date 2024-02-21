import { Route, Routes } from "react-router-dom";
import { UserProvider } from './components/UserContext';

import HomePage from "./components/HomePage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyEditor from "./components/MyEditor";
import SingleBlog from "./components/SingleBlog";
import './App.css'
import BlogPage from "./components/BlogPage";
import UserProfile from "./components/UserProfile";
import AboutUser from "./components/AboutUser";
import ReviewSection from "./components/ReviewSection";
import AdminDashboard from "./components/AdminDashboard";


function App() {
  return (   
    <UserProvider>
      <div className='max-w-[1440px] mx-auto'>
        <Header />
        

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign_up" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/write" element={<MyEditor />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard/>} />
            <Route path="/about" element={<AboutUser />} />

            <Route path="/comments" element={<ReviewSection />} />
            <Route path="/edit-content/:content_id" component={<MyEditor/>} />


            <Route path="/content/:id" element={<SingleBlog/>} />
            {/* <Route path="/content/:id" render={(props) => <SingleBlog {...props} />} /> */}


            
          </Routes>
        </main>
        
        {/* <SingleBlog/> */}
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
