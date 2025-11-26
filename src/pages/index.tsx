import { ReactNode, useEffect } from 'react'
import style from './index.module.css'
import SearchableLayout from '@/components/searchable-layout'
import BookItem from '@/components/book-item'
import { InferGetStaticPropsType } from 'next'
import fetchBooks from '@/lib/fetch-books'
import fetchRandomBooks from '@/lib/fetch-random-books'
import { BookData } from '@/types'
import Head from 'next/head'

export const getStaticProps = async () => {

  const [allBooks, recoBooks] = await Promise.all([ // 동시에 비동기함수 불러와서 조금더 렌더링 빨라짐.
    fetchBooks(),
    fetchRandomBooks(),
  ])

  return { // 이 데이터를 home 컴포넌트에 전달하게 설정하는 것. 
    props: { // 반드시 getServerSideProps의 리턴값인 props는 객체타입의 props가 들어가 있어야 한다. 이건 프레임워크의 문법임 약속
      allBooks,
      recoBooks
    },
    // revalidate : 3, // revalidate 재검증, 이 페이지를 3초마다 재검증. 3초 이후엔 새로운 페이지 반환
  }
};

export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  // window.location; // 이것도 오류
  useEffect(() => {
    console.log(window)
  }, []); //컴포넌트가 마운트된 이후에 실행되기 떄문에 이렇게 오류 해결 가능하긴 함.

  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property='og:image' content='/thumbnail.png'/>
        <meta property='og:title' content='한입북스'/>
        <meta property='og:description' content='한입 북스에 등록된 도서들을 만나보세요'/>
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book: BookData) => <BookItem key={book.id} {...book} />)}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
      </div>
    </>
  )

}

Home.getLayout = (page: ReactNode) => { // 서치바 컴포넌트를 가져온다.
  return <SearchableLayout>{page}</SearchableLayout>
}
//GetLayout이란 메서드를 호출하고 인수로 어떠한 페이지 컴포넌트를 전달하면 해당 페이지 컴포넌트를
//이러한 <SearchableLayout> 레이아웃으로 묶어서 리턴해준다 라고 생각하면 됨.

//페이지 별로 개별 레이아웃을 적용하고 싶을 떄 이런식으로 레이아웃을 적용하는 메서드를 컴포넌트에 하나 추가해서 앱
//컴포넌트로 넘겨주면 됨.