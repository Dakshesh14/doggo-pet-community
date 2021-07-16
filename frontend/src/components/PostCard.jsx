import React from 'react';
import {
    Link,
} from 'react-router-dom';

import axios from 'axios';

import {
    errorAlert,
} from '../common/useSwal';


function PostCard({ post, index, confirmDelete }) {

    const threeDot = (
        <div className="three-dot-container">
            <i className="fas fa-ellipsis-v fa-2x" id="three-dot" onClick={e => {
                e.target.nextSibling.classList.toggle('active');
            }} ></i>
            <ul className="list-group me-3">
                <button type="button" className="list-group-item list-group-item-action" onClick={() => {
                    confirmDelete(post.slug, index)
                }}>Delete</button>
            </ul>
        </div>
    )

    function handleLike(e) {
        let count;
        let slug = e.target.getAttribute("data-slug");
        axios({
            method: 'GET',
            url: `../posts/api/post/${slug}/like`
        }).then(res => {
            count = res.data.count
            e.target.classList.toggle('active');
            e.target.nextSibling.innerText = `${count} Likes`;
        }).catch(err => {
            let error = err.response.data.detail
            errorAlert(
                "Error",
                error,
                '<p>Please <a href="../accounts/login">Login</a> to like post.</p>',
            )
        })
    }

    return (
        <div className="post-card p-2 p-md-3 mt-4">
            {post.is_creator && threeDot}
            <div className="user-detail">
                <h5 className="mb-0">{post.user}</h5>
                <small className="text-muted">posted {post.posted_on}</small>
                <h3 className="mb-0 mt-2">{post.title}</h3>
                <p className="text-muted mt-2">{post.tur_content}</p>
            </div>
            <div className="post-img-container mt-4">
                <img src={post.image} className="img-fluid" alt="" />
            </div>
            <div className="post-actions mt-3">
                <p className="d-flex flex-column align-items-center">
                    <i className={post.liked ? 'fas fa-heart fa-2x active' : 'fas fa-heart fa-2x'} data-slug={post.slug} onClick={handleLike}></i>
                    <span>{post.likes} likes</span>
                </p>
                {/* <p className="d-flex flex-column align-items-center">
                    <i className="fas fa-comment-alt fa-2x"></i>
                    <span>{post.comments} comments</span>
                </p> */}
            </div>
        </div>
    )
}

export default PostCard
