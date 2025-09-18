import React, { useEffect, useState } from "react"

const AppContext =React.createContext ({
    data:[],
    isLoading:false,
    error:null,
    lastindex:0,
    setLastindex: () => {},
    addedEntry:null,
    setAddedEntry:null,
    isEntryAdded:false,
    setIsEntryAdded:false,
    notify:null,
    setNotify: () => {},
})

export const AppContextProvider = (props) => {
    const [data,setData] = useState([]);
    const [addedEntry,setAddedEntry] = useState(null);
    const [isEntryAdded,setIsEntryAdded] = useState(false);
    const [lastindex,setLastindex] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [notify,setNotify] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        async function fetchData() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                if(!response.ok){
                    throw new Error("failed to fetch");
                }
                const data = await response.json();
                const sliceData = data.slice(0,53)
                setData(sliceData);
                setLastindex(sliceData.length + 1);
            }
            
            catch (error) {
            setError(error.message || "Something went wrong!");
            }
            finally{
            setIsLoading(false);
            }
        }   
        fetchData();
    },[])

    return(
        <AppContext.Provider 
        value={{ data, isLoading, error, lastindex, setLastindex, addedEntry, setAddedEntry, isEntryAdded, setIsEntryAdded, notify, setNotify}}>
            {props.children}|
        </AppContext.Provider>
    )
}

export default AppContext