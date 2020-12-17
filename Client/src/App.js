import React from 'react';
import { BrowserRouter as Router , Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CourseList from "./components/course-list.component";
import StudentList from "./components/student-list.component";
import EditCousre from "./components/edit-course.component";
import EditStudent from "./components/edit-student.component";
import CreateCourse from "./components/create-course.component";
import CreateStudent from "./components/create-student.component";

function App() {
  return (

    <div className="container">
    <Router>
    <Navbar/>
  <br/>
  <Route path="/" exact component={CourseList} />
  <Route path="/students" exact component={StudentList} />
  <Route path="/editcourse/:id" exact component={EditCousre} />
  <Route path="/editstudent/:id" exact component={EditStudent} />
  <Route path="/createcourse" exact component={CreateCourse} />
  <Route path="/student" exact component={CreateStudent} />

  
    </Router>
    </div>
  );
}

export default App;
