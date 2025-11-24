import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router"
import { ReactNode } from "react";
import books from "@/mock/books.json"
import BookItem from "@/components/book-item";
export default function Page() {


    return <div>
        {books.map((book) => (
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

Page.getLayout = (page: ReactNode) => { // 서치바 컴포넌트를 가져온다.
    return <SearchableLayout>{page}</SearchableLayout>
}
