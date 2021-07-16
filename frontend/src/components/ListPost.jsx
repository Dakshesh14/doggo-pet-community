import React, { useState } from 'react';
import {
    useHistory,
} from 'react-router-dom';

// importing actions
import fetchPost from '../actions/useFetchPost';

// importing components
import Spinner from './Spinner';
import SideBar from './SideBar';
import PostLoader from './PostLoader';

function ListPost() {

    let history = useHistory();

    const [page, setPage] = useState(1);
    const [ordering, setOrdering] = useState('month-best');
    const [query, setQuery] = useState('');
    const { loading, hasMore, post, setPost } = fetchPost(page, ordering, query);

    if (loading) return <Spinner></Spinner>

    return (
        <>
            <div className="post-container my-5 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-sm-12 order-1 order-sm-0 mt-4 mt-sm-0">
                            <div className="container-fluid p-0">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <input type="text"
                                                placeholder="Add post"
                                                className="form-control"
                                                onFocus={() => {
                                                    history.push('/add-post')
                                                }} />
                                        </div>
                                    </div>
                                </div>
                                {
                                    query ?
                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <h4 className="fw-bold">
                                                    Results found for "{query}"
                                                </h4>
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                                <div className="row mt-3">
                                    {
                                        post.length >= 1
                                            ?
                                            <PostLoader
                                                post={post}
                                                setPage={setPage}
                                                page={page}
                                                hasMore={hasMore}
                                                setPost={setPost}
                                            />
                                            :
                                            <p className="text-muted">No post found {query && "with query " + query}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-12 order-0 order-sm-1">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-12">
                                        <SideBar
                                            setOrdering={setOrdering}
                                            setQuery={setQuery}
                                            ordering={ordering}
                                            query={query}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ListPost
