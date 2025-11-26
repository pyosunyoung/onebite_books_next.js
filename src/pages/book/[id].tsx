import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css"
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

// import Image from "next/image";


// const mockData = {

//     id: 1,
//     title: "한 입 크기로 잘라 먹는 리액트",
//     subTitle: "자바스크립트 기초부터 애플리케이션 배포까지",
//     description: "자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.",
//     author: "이정환",
//     publisher: "프로그래밍인사이트",
//     coverImgUrl: "https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg"

// }

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } }
    ],
    fallback: true, //대체, 대비책, 보험
  }// path book/4 즉 위에서 설정한 id에 일치하지 않을 때 fallback이 설정되고 위 아이디 처럼 1,2,3 페이지 제외 나머지 페이진 non found로 간주
}
// fallback 옵션
// fasle : 404 Notfound
// blocking : SSR 방식
// TRUE : SSR 방식 + 데이터가 없는 풀백 상태의 페이지부터 반환

export const getStaticProps = async (context: GetStaticPropsContext) => {

  const id = context.params!.id; // !는 있을 것이다.=> 애초에 페이지 자체가 param이 있어야 존재 가능한 페이지라 이렇게 설정.
  const book = await fetchOneBook(Number(id));
  console.log(id);

  if (!book) { // 북 데이터가 없다면 => 404 페이지로 이동
    return {
      notFound: true,
    }
  }
  return {
    props: {
      book
    },
  }
}


export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return ( // 페이지는 반환되었지만 데이터는 아직 안들어온 상태를 fallbakc상태라고 함.
      <>
        <Head>
          <title>한입북스</title>
          <meta property='og:image' content='/thumbnail.png' />
          <meta property='og:title' content='한입북스' />
          <meta property='og:description' content='한입 북스에 등록된 도서들을 만나보세요' />
        </Head> 
      </>
    ) //fallback 상황이라도 meta태그 설정되어지게 조건문 설정.
  }

  if (!book) return "문제가 발생했습니다 다시 시도하세요" // book 데이터가 null 일 수 있기 떄문에 그에 따른 예외처리

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property='og:image' content={coverImgUrl} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
      </Head>
      <div className={style.container}>
        <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
          <Image src={coverImgUrl} alt={title} width={272} height={349}  />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>)
}
// 파일을 [...id]로 설정하면 쿼리값 여러개 설정가능 이렇게 설정 시 book/123/1/23/123 가능, book/ 불가능 범용적 경로 설정 가능
// [[...id]].tsx optional catch all 세그먼트 => [[...id]] => book/ 없는 경로 설정 가능 , book/123/1~~이런것도 당옇니 가능
// 