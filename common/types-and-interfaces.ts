import { Author, Novel } from "@prisma/client";

export interface INovel extends Novel {
    authors:Author[];
}