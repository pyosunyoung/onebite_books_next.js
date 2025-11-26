import { BookData } from "@/types";

export default async function fetchBooks(q?:string): Promise<BookData[]>{
    let url = `https://onebite-books-server-main-ten-woad.vercel.app/book`

    if(q){ // 검색어가 존재한다면 검색 api를 불러오게 설정.
        url += `/search?q=${q}`
    }

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error();
        }

        return await response.json()
    } catch(err){
        console.log(err);
        return [];
    }
}