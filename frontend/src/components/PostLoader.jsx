import React from 'react';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroll-component';

// importing commons
import {
    confirmAlert,
    errorAlert,
    successAlert,
} from '../common/useSwal'

// importing actions
import { csrftoken } from '../actions/GetCSRFToken';

// importing components
import PostCard from './PostCard';
import Spinner from './Spinner';

function PostLoader({ post, setPage, page, hasMore, setPost }) {

    const deletePost = (slug, index) => {
        axios({
            method: 'DELETE',
            url: `../posts/api/post/${slug}`,
            mode: 'same-origin',
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': csrftoken,
                'Content-Type': 'multipart/form-data',
            },
        }).then(() => {
            let copyPost = Object.assign([], post);
            copyPost.splice(index, 1);
            setPost(copyPost);
            successAlert("Post deleted!", "Your post have been deleted.")
        }).catch(err => {
            let error = err.response.data.detail;
            errorAlert(
                error,
                "This could be because you aren't signed in or you didn't created this post",
                '<p>Please <a href="../accounts/login">Login</a> to go further delete post.</p>'
            )
        })
    }

    const confirmDelete = async (slug, index) => {
        const isConfirmed = await confirmAlert();
        if (isConfirmed) {
            deletePost(slug, index)
        }
    }


    return (
        <InfiniteScroll
            dataLength={post.length}
            next={() => {
                setPage(page + 1)
            }}
            hasMore={hasMore}
            loader={<Spinner></Spinner>}
            className="col-12 d-flex flex-wrap justify-content-around"
            style={{ overflowY: 'hidden' }}
        >
            {post.map((x, index) => (
                <PostCard post={x} key={x.slug} index={index} confirmDelete={confirmDelete} ></PostCard>
            ))}
        </InfiniteScroll>
    )
}

export default PostLoader
