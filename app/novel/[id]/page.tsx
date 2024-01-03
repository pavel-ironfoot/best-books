"use client"
import { GET_ONE_NOVEL } from "@/graphQl/queries";
import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { UPDATE_NOVEL } from "@/graphQl/mutations";

import './Novel.scss';


type Props = {
    params: {
        id: string;
    }
}

export default function Novel({ params: { id }}:Props ){
    const [title,setTitle] = useState('');
    const [url,setUrl] = useState('');

    const [updateNovel] = useMutation(UPDATE_NOVEL,{
        // variables: {id: id, title:title, image:url},
        refetchQueries:[{query:GET_ONE_NOVEL, variables:{id}}]
    });

    const handleUpdateNovel = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(title ==='' || url ==='') {return alert("Please enter the fields")} else{
            updateNovel({variables: {id:id, title:title, image:url}});
            setTitle('');
            setUrl('');
        }
        
    }

    const {error,loading,data} = useQuery(GET_ONE_NOVEL,{
        variables: {id},
    });

    if(error) return (
        <div><h1>Something going wrong...</h1></div>
    );

    if(loading) return (
        <div>
            <h1>Loading One Novel Page...</h1>
        </div>
    );
    if(data) return (
        <div className="one-novel-information">
            <h1>Novel {id}</h1>
            <h3>{data.novel.title}</h3>
            <img className="one-novel-information_image" src={data.novel.image} alt={"novel picture "+data.novel.image} />
            <hr />
            <form onSubmit={handleUpdateNovel} action="">
                <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter the new title" type="text" name="" id="" />
                <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Enter the new url" type="text" name="" id="" />
                <button type="submit">Edit</button>
            </form>
        </div>
    );
}