import { useEffect, useState, useMemo } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const SizeName = ({size}) => {
    return (
        <>
            <h2>All Service Dogs</h2>
            <h3>Breed Size {size.name}</h3>
        </>
    )
}

const AllDogsInSize = ({params}) => {
    const [dogs, setDogs] = useState({});
    const endpoint = `${baseUrl}/dogs?size=${params.id}&_embed`
    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setDogs(res.data)
        })
        .catch((err) => console.log(err))
    }, [endpoint])

    const renderedDogs = dogs.map((dog, index) => {
        return (
            <div className="dog-container item-container" key={index}>
                <Link className="dogs-link" to={`/dogs/${dog.id}`} >
                    <img src={dog._embedded['wp:featuredmedia']['0'].source_url} alt={dog.title.rendered} />
                    <h4 className="name">{dog.title.rendered}</h4>
                </Link>
            </div>
        )
    })

    // Return for All Dogs Sizes
    return (
        <>
            {renderedDogs}
        </>
    )
}

const DogsViaSizes = () => {
    const [size, setSize] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const sizeEndpoint = `${baseUrl}/size/${params.id}`
    // Set the Size Variable
    useEffect(() => {
        axios.get(`${sizeEndpoint}`)
        .then((res) => {
            setSize(res.data)
        })
        .catch((err) => console.log(err))
    }, [sizeEndpoint])

    // Return for Dogs in Sizes
    return (
        <div id="dogs-via-size" className="page-container">
            <button onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
            <SizeName size={size}/>
            <div id="dogs-grid" className="grid-container">
                <AllDogsInSize params={params}/>
            </div>
        </div>
    )
}

export default DogsViaSizes
