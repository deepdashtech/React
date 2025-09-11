import axios from 'axios'
import { useState } from 'react';

function useFetch(api)
{

    let [data,updateData]=useState([]);

    let [error,setError]=useState(null);
    let [loading,setLoading]=useState(true);

    axios.get(api)
    .then((response)=>{
        updateData(data=response.data);
        
        setLoading(loading=false);
    })
    .catch((err)=>{
        setError(error=err);
    })

    return {data,loading,error};
}

export default useFetch