"use client"

import { INovel } from "@/common/types-and-interfaces";
import { ADD_NOVEL } from "@/graphQl/mutations";
import { GET_NOVELS } from "@/graphQl/queries";
import { useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { OneNovel } from "../OneNovel";

import './Novels.scss';

export const Novels = () =>{
    const {error,loading,data} = useQuery(GET_NOVELS);
    const [image, setImage] = useState<string>('');
    const [title,setTitle] = useState('');
    const [addNovel] = useMutation(ADD_NOVEL,{
        // variables:{image:image,title:title},
        refetchQueries:[{query:GET_NOVELS}]
    });


    const novels:INovel[] = data?.novels;

    const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(image==='' || title==='') return alert('Enter fields');
        addNovel({variables:{image:image, title:title}});

        setImage('');
        setTitle('');
    }

    if(loading) return (<div>
        <h1>Loading...</h1>
    </div>);

    if(error) return (
        <div>
            <h1>Error...</h1>
        </div>
    );
    return (
        <div className="novels">
            <h1>Novels</h1>
            <form onSubmit={handleSubmit} action="">
                <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="enter the title" type="text" name="" id="" />
                <input value={image} onChange={e=>setImage(e.target.value)} placeholder="insert the url on image" type="text" name="" id="" />
                <button>Add novel</button>
            </form>
            <main className="novels-container">
                {novels.map((elem)=>{
                    return <OneNovel
                     key={elem.id}
                     novel={elem}
                     />
                })}
            </main>
        </div>
    );
}