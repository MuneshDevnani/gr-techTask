import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Course = props =>(
    <tr>
        <td>{props.course.coursename}</td>
        <td>{props.course.description}</td>
        <td>{props.course.students.map(items=>items.firstname+", ")}</td>
    <td>
    <Link to={"/editcourse/"+props.course._id}>edit</Link> | <a href="#" onClick={() => {props.deleteCourse(props.course._id) }}>delete</a>
    </td>
</tr>
)

export default class CourseList extends Component {
    constructor(props){
        super(props);
        this.deleteCourse = this.deleteCourse.bind(this);

        this.state ={course : []};
    }
    componentDidMount(){
        axios.get('http://localhost:5000/course/')
        .then(response => {
            this.setState({course: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteCourse(id){
        axios.delete('http://localhost:5000/course/'+id)
        .then(res => console.log(res.data));
        this.setState({
            course:this.state.course.filter(el => el._id !== id)
        })
    }
    courseList(){
        return this.state.course.map(currentcourse => {
            return <Course course={currentcourse} deleteCourse={this.deleteCourse} key={currentcourse._id} />
        })
    }
    render() {
        return (
            <div>
              <h3>Courses</h3>
              <table className="table">
                  <thead className="thead-light">
                      <tr>
                          <th>Course Name</th>
                          <th>Description</th>
                          <th>Enrolled Students</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                   <tbody>
                     { this.courseList()}
                   </tbody>
              </table>
            </div>
        )
    }
}
