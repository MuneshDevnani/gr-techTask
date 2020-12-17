import React, { Component } from 'react'
import axios from 'axios';
import '../App.css'
import M from 'materialize-css'

export default class CreateStudent extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeCoursename = this.onChangeCoursename.bind(this);
        this.onChangeCourseid = this.onChangeCourseid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            contact: '',
            address: '',
            course: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/course/')
            .then(response => {
                if (response.data.length > 0) {
                    console.log(response.data);
                    this.setState({
                        course: response.data
                    })
                }
            })
    }

    onChangeCoursename(e) {
        this.setState({
            coursename: e.target.value
        });
    }

    onChangeCourseid(e) {
        this.setState({
            courseid: e.target.value
        });
    }
    
    onChangeFirstname(e) {
        this.setState({
            firstname: e.target.value
        });
    }
    onChangeLastname(e) {
        this.setState({
            lastname: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        });
    }
    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const student = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            contact: this.state.contact,
            address: this.state.address,
            course:this.state.courseid
        }
        console.log(student);
        if(this.state.courseid !== undefined){
        axios.post('http://localhost:5000/student/add', student)
            .then(res =>{ 
                if(res.error){
                    M.toast({html: res.error, classes:"#c62828 red darken-3"})
                }
                else{
                    M.toast({html: res.data.message, classes:"#43a047 green darken-1"})
                }
                console.log(res)
            });
            this.setState({
                firstname: '',
                lastname: '',
                email: '',
                contact: '',
                address: '',
            })
        }else{
            M.toast({html: "Please Select Course", classes:"#c62828 red darken-3"})
        }
        
    }
    render() {
        return (
            <div>
                <h3>Add New Student</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label>First Name <span className="required">*</span></label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.firstname}
                                    onChange={this.onChangeFirstname}
                                />
                            </div>
                            <div className="col">
                                <label>Last Name <span className="required">*</span></label>
                                <input type="text"
                                    className="form-control"
                                    value={this.state.lastname}
                                    onChange={this.onChangeLastname}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Email <span className="required">*</span></label>
                                <input type="email"
                                    required
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                />
                            </div>
                            <div className="col">
                                <label>Contact <span className="required">*</span></label>
                                <input type="text"
                                    required
                                    className="form-control"
                                    value={this.state.contact}
                                    onChange={this.onChangeContact}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Address <span className="required">*</span></label>
                                <textarea
                                    required
                                    rows="2"
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={this.onChangeAddress}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Coursename <span className="required">*</span></label>
                                <select ref="courseInput"
                                    required
                                    className="form-control"
                                    value={this.state.courseid}
                                    onChange={this.onChangeCourseid}>
                                        <option value="none" selected disabled hidden> 
                                            Select a Course
                                        </option>
                                    {
                                        this.state.course.map(function (course) {
                                            return <option
                                                key={course._id}
                                                value={course._id}>{course.coursename}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Student" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
