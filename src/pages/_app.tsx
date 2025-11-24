import GlobalLayout from "@/components/global-layout";
import SearchableLayout from "@/components/searchable-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

type NextPageWithLayout = NextPage & { // NextPage Next에서 제공하는 기본 page 컴포넌트 타입
  getLayout?: (page: ReactNode) => ReactNode;
  //기존 next js 타입에 이러한 getLayout 타입의 getLayout을 추가시켜준것
}

export default function App({ Component, pageProps }: AppProps & {
  Component: NextPageWithLayout
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  //Component.getLayout이 undefined라면 page를 그대로 리턴 서치바가 없는채로 리턴
  return (

    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}

    </GlobalLayout>
  );


}
