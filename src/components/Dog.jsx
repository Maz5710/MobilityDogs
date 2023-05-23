import {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons'
import axios from 'axios'

//Import baseUrl env
const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Sizes = ({dog}) => {
    const [taxonomies, setTaxonomies] = useState([])

    useEffect(() => {
        if (!dog) {
            return;
        }
        const taxonomyEndpoint = dog._links["wp:term"][0].href;

        axios.get(`${taxonomyEndpoint}`)
        .then((res) => {
            console.log('dog-taxonomy-call');
            setTaxonomies(res.data)
        })
        .catch((err) => console.log(err))
    }, [dog])

    const renderedTaxonomies = taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/size/${taxonomy.id}`} key={index}>
                <span className="taxonomy-term-pill">
                    {taxonomy.name}
                </span>
            </Link>
        )
    })

    return (
        <div>
            {renderedTaxonomies}
        </div>
    )
}

const Dog = () => {
    const [dog, setDog] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams();

    const navigate = useNavigate();

    const endpoint = `${baseUrl}/dogs/${id}?_embed`


    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setDog(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    //Check for featured or render placeholder
    function getFeaturedImage(dog) {
        if (dog && dog._embedded && dog._embedded['wp:featuredmedia'] && dog._embedded['wp:featuredmedia'][0].source_url) {
            return dog._embedded['wp:featuredmedia'][0].source_url;
        } else {
            return '<https://via.placeholder.com/150>'
        }
    }

    if (loading) {
        return <>Loading...</>
    }

  return (
    <div className='container'>
        <button onClick={()=>navigate(-1)}><ArrowLeft/>Go Back</button>
      <h2>Service Dog Breed</h2>
      <div key={dog.slug} className="post-container">
          <h4 className="title">{dog.title.rendered}</h4>
          <Sizes dog={dog}/>
          <img src={getFeaturedImage(dog)} alt="Post Featured Image"/>
          <div dangerouslySetInnerHTML={{ __html: dog.content.rendered }} />
          <div>Key: {dog.slug}</div>
      </div>
    </div>
  )
}

export default Dog

