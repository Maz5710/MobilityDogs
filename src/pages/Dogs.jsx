import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Dogs = () => {
    const [dogs, setDogs] = useState(null)
    const [loading, setLoading] = useState(true)

    const endpoint = `${baseUrl}/dogs`

    console.log({endpoint}, {baseUrl});

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setDogs(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    const Dogs = ({dogs}) => {
        const mappedDogs = dogs.map((dog, index) => {
            return (
                <div key={dog.slug + "-" + index} className="post-container">
                <h4 className="title">{dog.title.rendered}</h4>
                {/* <h3 className="size">{dog.size.rendered}</h3> */}
                <div dangerouslySetInnerHTML={{ __html: dog.content.rendered }} />
                <div>Key: {dog.slug + "-" + index}</div>
                <li key={Dogs.slug + "-" + index}>
                    <a href={`#/dog/${dog.id}`}><button>READ MORE</button></a>
                </li>
            </div>               
            )
        })

        return (
            <>
                {mappedDogs}
            </>
        )
    }

  return (
    <div className='container'>
        <h2>Service Dogs - What is the best breed?</h2>
        <p id="purpose">
        Service dogs play a vital role in the lives of people with disabilities, ranging from autism to muscular dystrophy. These loving animals help their owners perform day-to-day tasks, and some are specially trained for people with diabetes, epilepsy, or PTSD.</p> 
        <div id="dogsCont">
            {loading ? <>Loading...</> : <Dogs dogs={dogs}/>}
        </div>      
    </div>
  )
}

export default Dogs


