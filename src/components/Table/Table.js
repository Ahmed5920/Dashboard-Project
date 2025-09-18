import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import Pagination from "./Pagination";
import Modal from "../UI/Modal";
import ItemForm from "./ItemForm";
import { CiSearch } from "react-icons/ci";

const Table = () => {
    const [currPage, setCurrPage] = useState(1);
    const ctx = useContext(AppContext)
    const [posts,setPosts] = useState(ctx.data);
    const [showForm,setShowForm] = useState(false);
    const [editPost,setEditPost]= useState({});
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setPosts(ctx.data);
    }, [ctx.data]);

    useEffect(() => {
        if (ctx.isEntryAdded && ctx.addedEntry) {
            setPosts((prev) => [...prev, ctx.addedEntry]);
            ctx.setIsEntryAdded(false);
        }
    }, [ctx.isEntryAdded, ctx.addedEntry, ctx]);

    const filteredPosts = posts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const itemsPerPage = 10; 
    const totalPages = Math.ceil(filteredPosts.length/itemsPerPage);
    const firstItemIndexonPage = (currPage - 1) * itemsPerPage;
    const lastItemIndexonPage = firstItemIndexonPage + itemsPerPage;
    const currPosts = filteredPosts.slice(firstItemIndexonPage,lastItemIndexonPage);

    const deleteItemHandler = (id) => {
        if(id === posts.length){
            ctx.setLastindex((prevIndex) => prevIndex - 1 );
        }
        setPosts((prevState) => prevState.filter((post) => post.id !== id));
        ctx.setNotify({ msg: "Deleted successfully", type: "success" });
    } 
    const editItemHandler = (id) => {
        const postToEdit = posts.find((post) => post.id === id);
        if(postToEdit){
            setEditPost(postToEdit);
        }
        setShowForm(true);
    }
    console.log(editPost);
    
    return(
        <div className="overflow-x-auto">
            <div className="mb-4 flex justify-end">
                <div className="relative w-1/3">
                    <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrPage(1);
                    }}
                    className="border rounded-md pl-10 pr-3 py-2 w-full focus:outline-none"
                    />
                </div>
            </div>
            <table className="w-full table-auto mb-4 border-collapse">
                <thead className="border bg-black text-white">
                    <tr>
                        <th className="border px-3 py-2 text-left">ID</th>
                        <th className="border px-3 py-2 text-left">Title</th>
                        <th className="border px-3 py-2 text-left">Body</th>
                        <th className="border px-3 py-2 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-xl">
                    {currPosts.map((post)=>(
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td className="px-4 py-3 space-x-2 inline-flex border-b-0 border-l-0 border-r-0 border-t-1">
                                <button className="bg-yellow-500 px-2 py-1 rounded-md font-bold" onClick={editItemHandler.bind(null,post.id)}>Edit</button>
                                <button className="bg-red-500 px-2 py-1 rounded-md font-bold" onClick={deleteItemHandler.bind(null,post.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <Pagination
                currPage={currPage}
                setCurrPage={setCurrPage}
                totalPages = {totalPages}
                />
            {showForm && <Modal open={showForm} onClose={() => setShowForm(false)}> 
                <ItemForm onClose={() => setShowForm(false)} formTitle={"Edit Entry"} editPost={editPost} setPosts={setPosts} />
            </Modal>}
        </div>
    )
}

export default Table;