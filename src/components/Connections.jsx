import React from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    // console.log(connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true, });
            // console.log(res.data.data);
            // console.log(addConnections(res.data.data));
            dispatch(addConnection(res.data.data));

        } catch (err) {
            // handle error case
            
        }
    }

    useEffect( () => {
        fetchConnections();
    }, []);
    
    if(!connections) return;
    if(connections.length === 0) return <h1 className='flex justify-center my-10'> No Connection Found </h1>;

    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-white text-3xl '>Connections</h1>

            {connections.map((connection) => {
                const {_id, firstName, lastName, photoUrl, age, gender, about } = connection;
                return (
                    <div key={_id} className='flex justify-center m-4 p-4 rounded-lg bg-base-300 mx-auto w-1/2'>
                        <div>
                            <img 
                                src={photoUrl} 
                                alt={`${firstName} 's profile photo`}
                                className='w-20 h-20 rounded-full object-' />
                        </div>
                        <div className='text-left mx-4'>
                            <h2 className='font-bold text-xl'>
                                {firstName + " " + lastName}
                            </h2>
                            { age && gender && <p>{age + ", " + gender}</p>}
                            <p>{about + " " + firstName}</p>
                        </div>
                        
                    </div>
                );
            })}

        </div>
    )
}

export default Connections