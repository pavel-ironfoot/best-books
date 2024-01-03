import { INovel } from "@/common/types-and-interfaces";
import './OneNovel.scss';
import { useMutation } from "@apollo/client";
import { DELETE_NOVEL } from "@/graphQl/mutations";
import { GET_NOVELS } from "@/graphQl/queries";
import Link from "next/link";

type OneNovelProps = {
    novel: INovel
}
export const OneNovel:React.FC<OneNovelProps> = ({novel}) =>{
    const [deleteNovel] = useMutation(DELETE_NOVEL,{
        // variables:{id:novel.id},
        refetchQueries:[{query:GET_NOVELS}]
    })

    const deleteNovelFunc = () =>{
        deleteNovel({variables:{id:novel.id}});
    }

    return (
        <div className="one-novel">
            <h1>One Novel</h1>
            {
                novel.image && <img className="one-novel__image" src={novel.image} alt={novel.title} />
            }
            <h1>{novel.title}</h1>
            <Link href={`/novel/${novel.id}`}>Read More</Link>
            <button onClick={deleteNovelFunc}>Delete</button>
        </div>
    );
}