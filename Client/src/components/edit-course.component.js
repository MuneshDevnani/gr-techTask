import React, { Component } from 'react';
import axios from 'axios';
import M from 'materialize-css'

export default class EditCourse extends Component {
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
    componentDidMount() {
        axios.get('http://localhost:5000/course/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    coursename: response.data.coursename,
                    description: response.data.description
                })
            })
            .catch(function (error) {
                console.log(error);
            })
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

        axios.post('http://localhost:5000/course/update/' + this.props.match.params.id, course)
            .then(res => {
                if (res.error) {
                    M.toast({ html: res.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: res.data.message, classes: "#43a047 green darken-1" })
                }
                console.log(res.data)
            });
        this.setState({
            coursename: '',
            description: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Edit Course Details</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Course Name </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.coursename}
                            onChange={this.onChangeCoursename}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Course Details" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
