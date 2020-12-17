import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import M from 'materialize-css'

export default class CreateCourse extends Component {
    constructor(props) {
        super(props);

        this.onChangeCoursename = this.onChangeCoursename.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            coursename: '',
            description: ''
        }
    }

    onChangeCoursename(e) {
        this.setState({
            coursename: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const course = {
            coursename: this.state.coursename,
            description: this.state.description
        }
        console.log(course);

        axios.post('http://localhost:5000/course/add', course)
            .then(res => {
                console.log(res);
                if(res.error){
                    M.toast({html: res.error, classes:"#c62828 red darken-3"})
                }
                else{
                    M.toast({html: res.data.message, classes:"#43a047 green darken-1"})
                }
            })
            this.setState({
                coursename: '',
                description: ''
            })
    }

    render() {
        return (
            <div>
                <h3>Add course</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Course Name <span className="required">*</span></label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.coursename}
                            onChange={this.onChangeCoursename}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description <span className="required">*</span></label>
                        <textarea
                            required
                            rows='3'
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Course" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
