import React, { useEffect, useState } from 'react';

import axios from 'axios';

function fetchPost(page, ordering, query) {

    const [post, setPost] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setPost([])
    }, [ordering, query,])

    useEffect(() => {
        let cancel
        axios({
            method: "GET",
            url: "../posts/api/post-list",
            params: {
                page: page,
                ordering: ordering,
                search: query,
            },
            cancelToken: new axios.CancelToken(c => cancel = c),
        }).then(res => {
            if (res.data.next != null) {
                setHasMore(true)
            }
            else setHasMore(false)
            setPost(post => {
                return [...new Set([...post, ...res.data.results])]
            });
            setLoading(false);
        }).catch(e => {
            if (axios.isCancel(e)) return setLoading(true)
        })
        return () => cancel()
    }, [page, ordering, query])

    return { loading, hasMore, post, setPost }
}

export default fetchPost