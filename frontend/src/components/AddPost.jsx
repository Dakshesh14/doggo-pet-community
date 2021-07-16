import React from 'react';
import {
    Link,
} from 'react-router-dom';

import submitForm from '../actions/submitForm';

function AddPost() {

    return (
        <div className="container my-5 py-5">
            <div className="row mb-3">
                <div className="col-12">
                    <small>
                        <Link to="/" className="a-set-none">Go back</Link>
                    </small>
                    <h2 className="mb-0">Add post</h2>
                    <p>You can post anything related to your pet!</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form action="../posts/api/post-list" method="POST" onSubmit={e => submitForm(e)}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Title"
                                name="title"
                                id="title"
                            />
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content:</label>
                            <textarea
                                name="content"
                                className="form-control"
                                placeholder="Describe your issue"
                                id="content"
                                rows="3"
                            ></textarea>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Add an image</label>
                            <input className="form-control" type="file" id="image" name="image" />
                            <div className="invalid-feedback"></div>
                        </div>
                        <button className="btn btn-primary" type="submit">Add Post</button>
                        <Link className="btn btn-secondary ms-2" to="/posts">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPost
