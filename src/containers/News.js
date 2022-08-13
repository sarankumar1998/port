import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from './Spinner/Spinner'

export default function News() {

    const [details, setDetails] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                setLoad(true)
                setDetails(res.data.sort((a,b) => a.name.localeCompare(b.name)))
                setLoad(false)
            })
    })

    return (
        <div className='mt-5'>
            {load ? <Spinner /> :
                <table class="table container">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">UserName</th>
                            <th scope="col">email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((e) => (
                            <> <tr><th scope="row">{e.id}</th>
                                <td>{e.name}</td>
                                <td>{e.username}</td>
                                <td>{e.email}</td>   
                                </tr>
                                </>
                        ))}
                    </tbody>
                </table>
            }


        </div>

    )
}
