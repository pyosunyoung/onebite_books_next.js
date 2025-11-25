import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
// import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";

// export const getStaticProps = async(context: GetStaticPropsContext) => {
//     console.log(context);
//     const q = context.query.q; // 빌드 타임에는 query값을 알 수 없기 때문에 query오류 남.
//     const books = await fetchBooks(q as string);

//     return{
//         props: {
//             books,
//         }
//     }
// }

export default function Page() {
    const [books, setBooks] = useState<BookData[]>([]);

    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async() => {
        const data = await fetchBooks(q as string);
        setBooks(data);
    }

    useEffect(()=>{
        if(q){
            //검색 결과를 불러오는 로직
            fetchSearchResult();
        }
    }, [q]);

    return <div>
        {books.map((book) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

Page.getLayout = (page: ReactNode) => { // 서치바 컴포넌트를 가져온다.
    return <SearchableLayout>{page}</SearchableLayout>
}
