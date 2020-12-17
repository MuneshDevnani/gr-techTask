import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = props =>(
    <tr>
        <td>{props.student.firstname}</td>
        <td>{props.student.lastname}</td>
        <td>{props.student.email}</td>
        <td>{props.student.contact}</td>
        <td>{props.student.address}</td>
        <td>{props.student.course.map(items=>(items.coursename + ", "))}</td>
        <td>
    <Link to={"/editstudent/"+props.student._id}>edit</Link> | <a href="#" onClick={() => {props.deleteStudent(props.student._id) }}>delete</a>
    </td>
</tr>
)



export default class StudentList extends Component {
    constructor(props){
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);

        this.state ={student : []};
    }
    componentDidMount(){
        axios.get('http://localhost:5000/student/')
        .then(response => {
            this.setState({student: response.data})
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteStudent(id){
        axios.delete('http://localhost:5000/student/'+id)
        .then(res => console.log(res.data));
        this.setState({
            student:this.state.student.filter(sl => sl._id !== id)
        })
    }
    studentList(){
        return this.state.student.map(currentstudent => {
            return <Student student={currentstudent} deleteStudent={this.deleteStudent} key={currentstudent._id} />
        })
    }

    render() {
        return (
            <div>
              <h3>Students</h3>
              <table className="table">
                  <thead className="thead-light">
                      <tr>
                          <th>First Name</th>
                          <th>Last Nane</th>
                          <th>Email</th>
                          <th>Contact</th>
                          <th>Address</th>
                          <th>Courses</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                   <tbody>
                     { this.studentList()}
                   </tbody>
              </table>
            </div>
        )
    }
}
