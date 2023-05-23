import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Medium = () => {
    const [medium, setMedium] = useState(null)
    const [loading, setLoading] = useState(true)

    const endpoint = `${baseUrl}/dogs?size=18`

    console.log({endpoint}, {baseUrl});

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setMedium(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    const Medium = ({medium}) => {
        const mappedMedium = medium.map((medium, index) => {
            return (
                <div key={medium.slug + "-" + index} className="post-container">
                <h4 className="size">{medium.size.rendered}</h4>
                <div dangerouslySetInnerHTML={{ __html: medium.content.rendered }} />
                <div>Key: {medium.slug + "-" + index}</div>
                <li key={Medium.slug + "-" + index}>
                    <a href={`#/medium/${medium.id}`}><button>READ MORE</button></a>

                </li>
            </div>               
            )
        })

        return (
            <>
                {mappedMedium}
            </>
        )
    }

  return (
    <div className='container'>
        <h2>Medium Service Dogs</h2>
        <div id="mediumCont">
            {loading ? <>Loading...</> : <Medium medium={medium}/>}
        </div>      
    </div>
  )
}

export default Medium

