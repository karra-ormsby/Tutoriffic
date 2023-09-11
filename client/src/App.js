import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Modules from "./pages/Modules";
import Students from "./pages/Students";
import QuizCreator from './pages/QuizCreator';
import Module from './pages/Module'
import Grades from "./pages/Grades";
import Navbar from "./components/Navbar";
import Quizzes from "./pages/QuizDashboard";
import Quiz from "./pages/Quiz";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Calendar from "./pages/Calendar";
import LessonCreator from "./pages/LessonCreator";
import Lessons from "./pages/LessonsDashboard";
import Lesson from "./pages/Lesson";
import PostCreator from "./pages/PostCreator";
import Posts from "./pages/PostDashboard";
import Post from "./pages/Post";
import { isLoggedIn } from "./utils/auth";
import { ArrowRightOutlined } from "@ant-design/icons";


// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const token = localStorage.getItem("id_token");
  // Initialize loggedIn state
  const [loggedIn, setLoggedIn] = useState(isLoggedIn()); 

  const handleLogout = () => {
    localStorage.removeItem('id_token');
    // Update the loggedIn state when logging out
    setLoggedIn(false); 
  };

  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="app">
          <header>
            <div className="header-container">
            <div className="header-image">
              <div className="overlay">
                <div className="heading">
                  <a href="/">T U T O R I F F I C</a>
                </div>
                <p>teacher</p>
              </div>
            </div>
            {loggedIn && <button style = {{padding: "0"}}onClick={handleLogout}>Logout <ArrowRightOutlined /></button>}
          </div>
          </header>
          <nav>
            <Navbar />
          </nav>
          <main>
            <Routes>
              {/* Public routes accessible to all */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Private routes accessible only when logged in */}
              {loggedIn ? (
                <>
                  <Route exact path="/" element={<Dashboard />} />
                  <Route path="/modules" element={<Modules />} />
                  <Route path="/modules/:moduleId" element={<Module />} />
                  <Route path="/quizzes" element={<Quizzes />} />
                  <Route path="/quizzes/:quizId" element={<Quiz />} />
                  <Route path="/quizzes/add" element={<QuizCreator />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/students/grades" element={<Grades />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/lesson/add" element={<LessonCreator />} />
                  <Route path="/lessons" element={<Lessons />} />
                  <Route path="/lessons/:lessonId" element={<Lesson />} />
                  <Route path="/posts/add" element={<PostCreator />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/posts/:postId" element={<Post />} />
                </>
              ) : (
                // Redirect to login if not logged in
                <Route path="/*" element={<Navigate to="/login" />} />
              )}
            </Routes>

          </main>
        </div>

      </ApolloProvider>
    </Router>
  );
};

export default App;