import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

//Import baseUrl env
const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Post = () => {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams();

    const endpoint = `${baseUrl}/posts/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data);
            setPost(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [id])

    //Check for featured or render placeholder
    function getFeaturedImage(post) {
        if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
            return post._embedded['wp:featuredmedia'][0].source_url;
        } else {
            return 'https://via.placeholder.com/150'
        }
    } 

    if (loading) {
        return <>Loading...</>
    }

  return (
    <div className='flex-container'>
      <h2>Our Stories: Kōrero</h2>
      <div key={post.slug} className="post-container">
          <h4 className="title">{post.title.rendered}</h4>
          <img src={getFeaturedImage(post)} alt="Post Featured Image"/>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          <div>Key: {post.slug}</div>
      </div>
    </div>
  )
}

export default Post

