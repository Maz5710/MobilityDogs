import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Small = () => {
    const [small, setSmall] = useState(null)
    const [loading, setLoading] = useState(true)

    const endpoint = `${baseUrl}/dogs?size=19`

    console.log({endpoint}, {baseUrl});

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setSmall(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    const Small = ({small}) => {
        const mappedSmall = small.map((small, index) => {
            return (
                <div key={small.slug + "-" + index} className="post-container">
                <h4 className="size">{small.size.rendered}</h4>
                <div dangerouslySetInnerHTML={{ __html: small.content.rendered }} />
                <div>Key: {small.slug + "-" + index}</div>
                <li key={Small.slug + "-" + index}>
                    <a href={`#/small/${small.id}`}><button>READ MORE</button></a>

                </li>
            </div>               
            )
        })

        return (
            <>
                {mappedSmall}
            </>
        )
    }

  return (
    <div className='container'>
        <h2>Small Service Dogs</h2>
        <div id="smallCont">
            {loading ? <>Loading...</> : <Small small={small}/>}
        </div>      
    </div>
  )
}

export default Small

