import { useState, useEffect } from 'react'
import axios from 'axios'
import hero from '../assets/hero_1.png'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(null)

    const endpoint = `${baseUrl}/posts`

    console.log({baseUrl}, {endpoint});
      
        useEffect(() => {
            axios.get(`${endpoint}`)
            .then((res) => {
                console.log(res.data);
                setPosts(res.data)
                setLoading(false)
            })
            .catch((err) => console.log(err))
        }, [])

    // //Check for featured or render placeholder
    // function getFeaturedImage(post) {
    //     if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
    //         return post._embedded['wp:featuredmedia'][0].source_url;
    //         } else {
    //         return 'https://via.placeholder.com/150'
    //         }
    //     }

        const Posts = ({posts}) => {
            const mappedPosts = posts.map((post, index) => {
                return (
                    <div key={post.slug + "-" + index} className="post-container">
                {/* <img src={getFeaturedImage(post)} alt="Post Featured Image"/> */}
                    <h4 className="title">{post.title.rendered}</h4>
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <div>Key: {post.slug + "-" + index}</div>
                    <li key={post.slug + "-" + index}>
                         <a href={`#/post/${post.id}`}><button>READ MORE</button></a>
                    </li>
                </div>
                )
            })

            return (
                <>
                {mappedPosts}
                </>
            )
        }

  return (
    <div>
        <div id='hero'><img src={hero}/>
        <h1 id='hero-text'>Life Changing Loyalty</h1>  
        </div>
        <p id="purpose">
        Mobility dogs are trained to offer practical support, companionship and security. They transform the lives of people living with disabilities, and your support can make an incredible difference. </p> 
        <h2>Our Stories</h2>
        <container className='flex-container'>
        <div id="homeCont">
            {loading ? <p>Loading ...</p> : <Posts posts={posts} />}
        </div>
        </container>
    </div>
  )
}

export default Home
