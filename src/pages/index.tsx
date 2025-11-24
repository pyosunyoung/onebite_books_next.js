// import "./index.css" 오류
import { ReactNode } from 'react'
import style from './index.module.css'
import SearchableLayout from '@/components/searchable-layout'
import books from '@/mock/books.json' //@는 src를 가리킴 ts config에 나와있음.
import BookItem from '@/components/book-item'

export default function Home() {
  return <div className={style.container}>
    <section>
      <h3>지금 추천하는 도서</h3>
      {books.map((book)=><BookItem key={book.id} {...book}/>)}
    </section>
    <section>
      <h3>등록된 모든 도서</h3>
      {books.map((book)=><BookItem key={book.id} {...book}/>)}
    </section>
  </div>

}

Home.getLayout = (page: ReactNode) => { // 서치바 컴포넌트를 가져온다.
  return <SearchableLayout>{page}</SearchableLayout>
}
//GetLayout이란 메서드를 호출하고 인수로 어떠한 페이지 컴포넌트를 전달하면 해당 페이지 컴포넌트를
//이러한 <SearchableLayout> 레이아웃으로 묶어서 리턴해준다 라고 생각하면 됨.

//페이지 별로 개별 레이아웃을 적용하고 싶을 떄 이런식으로 레이아웃을 적용하는 메서드를 컴포넌트에 하나 추가해서 앱
//컴포넌트로 넘겨주면 됨.