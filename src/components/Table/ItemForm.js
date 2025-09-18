import { useContext, useEffect, useState } from "react";
import Button from "../UI/Button";
import AppContext from "../../Context/AppContext";

const ItemForm = ({onClose,formTitle,editPost,setPosts}) => {
    const [title,setTitle]= useState("");
    const [body,setBody]= useState("");
    const ctx = useContext(AppContext);

    useEffect(() =>{
        if(editPost && formTitle === "Edit Entry"){
            setTitle(editPost.title);
            setBody(editPost.body)
        }
    },[editPost,formTitle])

    const submitHandler = (event) =>{
        event.preventDefault();
        if(formTitle === "Create Entry"){
            const data = {
                id:ctx.lastindex,
                title,
                body,
            }
            ctx.setAddedEntry(data)
            ctx.setLastindex((prevIndex) => prevIndex + 1 );
            ctx.setIsEntryAdded(true);
            ctx.setNotify({ msg: "Created successfully", type: "success" });
        }
        if(formTitle === "Edit Entry"){
            setPosts(prevState => 
                prevState.map((post) =>
                post.id === editPost.id ? { ...editPost,title,body} : post
            ))
            ctx.setNotify({ msg: "Updated successfully", type: "success" });
        }
        onClose();
    }


    return(
        <form onSubmit={submitHandler}> 
            <h1 className="text-lg font-semibold mb-6">{formTitle}</h1>
            <div className="flex flex-col space-y-2 "> 
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Title" className="border border-gray-400 rounded-sm p-2 focus:border-black" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-2 mt-6">
                <label htmlFor="title">Body</label>
                <textarea type="text" id="title" rows={5} placeholder="Body" className="border border-gray-400 rounded-sm focus:border-black" value={body} onChange={(e) => setBody(e.target.value)}/>
            </div>
            <div className="flex justify-end gap-2 mt-6">
                <Button type="button" className="px-3 py-1 rounded border" onClick={onClose}>Cancel</Button>
                <Button type="submit" className="px-3 py-1 rounded bg-blue-600 text-white">Save</Button>
            </div>
        </form>
    )
}

export default ItemForm;