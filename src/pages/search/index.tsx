import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
// import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import Head from "next/head";

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

    useEffect(() => {
        const fetchSearchResult = async () => {
            if (!q) return;
            const data = await fetchBooks(q as string);
            setBooks(data);
        };

        fetchSearchResult();
    }, [q]);

    return (
        <div>
            <Head>
                <title>한입북스 - 검색결과</title>
                <meta property='og:image' content='/thumbnail.png' />
                <meta property='og:title' content='한입북스 - 검색결과' />
                <meta property='og:description' content='한입 북스에 등록된 도서들을 만나보세요' />
            </Head>
            {books.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    )
}

Page.getLayout = (page: ReactNode) => { // 서치바 컴포넌트를 가져온다.
    return <SearchableLayout>{page}</SearchableLayout>
}
