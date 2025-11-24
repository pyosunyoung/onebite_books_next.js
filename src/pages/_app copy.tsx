import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const onClickButton = () => {
    router.push("/test"); 
  }

  useEffect(()=>{
    router.prefetch('/test') // 이렇게 하면 
  },[])
  return <>
    <header>
      글로버 헤더
      <Link href={"/"}>index</Link>
      &nbsp;
      <Link href={"/search"} prefetch={false}>search</Link>
      &nbsp;
      <Link href={"/book/1"}>book</Link>
      <div>
        <button onClick={onClickButton}>/test 페이지로 이동/</button>
      </div>
    </header>
    <Component {...pageProps} />
  </>
  
}
