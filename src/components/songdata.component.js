﻿import React, { Component } from "react";
import SongDDataService from "../services/songdata.service";

export default class SongData extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getSongData = this.getSongData.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateSongData = this.updateSongData.bind(this);
        this.deleteSongData = this.deleteSongData.bind(this);

        this.state = {
            currentSongData: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getSongData(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentSongData: {
                    ...prevState.currentSongData,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentSongData: {
                ...prevState.currentSongData,
                description: description
            }
        }));
    }

    getSongData(id) {
        SongDDataService.get(id)
            .then(response => {
                this.setState({
                    currentSongData: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentSongData.id,
            title: this.state.currentSongData.title,
            description: this.state.currentSongData.description,
            published: status
        };

        SongDDataService.update(this.state.currentSongData.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentSongData: {
                        ...prevState.currentSongData,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateSongData() {
        SongDDataService.update(
            this.state.currentSongData.id,
            this.state.currentSongData
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The songdata was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteSongData() {
        SongDDataService.delete(this.state.currentSongData.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/songdatas')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentSongData } = this.state;

        return (
            <div>
                {currentSongData ? (
                    <div className="edit-form">
                        <h4>SongData</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentSongData.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentSongData.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentSongData.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentSongData.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteSongData}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateSongData}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a SongData...</p>
                    </div>
                )}
            </div>
        );
    }
}
