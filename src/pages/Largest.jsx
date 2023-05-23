import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Largest = () => {
    const [largest, setLargest] = useState(null)
    const [loading, setLoading] = useState(true)

    const endpoint = `${baseUrl}/dogs?size=17`

    console.log({endpoint}, {baseUrl});

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setLargest(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    const Largest = ({largest}) => {
        const mappedLargest = largest.map((large, index) => {
            return (
                <div key={large.slug + "-" + index} className="post-container">
                <h4 className="size">{large.size.rendered}</h4>
                <div dangerouslySetInnerHTML={{ __html: large.content.rendered }} />
                <div>Key: {large.slug + "-" + index}</div>
                <li key={Largest.slug + "-" + index}>
                    <a href={`#/large/${large.id}`}><button>READ MORE</button></a>

                </li>
            </div>               
            )
        })

        return (
            <>
                {mappedLargest}
            </>
        )
    }

  return (
    <div className='container'>
        <h2>Large Service Dogs</h2>
        <p id="purpose">
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p> 
        <div id="largestCont">
            {loading ? <>Loading...</> : <Largest largest={largest}/>}
        </div>      
    </div>
  )
}

export default Largest
