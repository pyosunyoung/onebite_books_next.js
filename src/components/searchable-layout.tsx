import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react"
import style from "./searchable-layout.module.css"
export default function SearchableLayout({children}:{
    children: ReactNode,
}) {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const q = router.query.q as string; // 아마도 string일 것이다. 추론
    useEffect(() => {
        setSearch(q || "");
    }, [q])

    const onChangeSearch = (e : React.ChangeEvent<HTMLInputElement>) => { // HTMLINput에서 나온 타입임
        setSearch(e.target.value)
    }

    const onSubmit = () => {
        if(!search) {
        router.push("/");
        setSearch(""); // 입력창 초기화
        return;
    }

        if(!search || q === search) return; // q값과 search값 동일 즉 동일한 검색어 입력시 리턴, 중복 검색 방지 및 페이지 이동 방지
        
        router.push(`/search?q=${search}`);
        setSearch("");
        
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { // 키보드 입력이 발생했을 때 실행하는 함수.
        if(e.key === "Enter"){ // 현재 엔터입력 시 검색 불가인 요류 이렇게 해결
            onSubmit()
        } 
    }

    return (
        <div>
            <div className={style.searchbar_container}>
                <input 
                onKeyDown={onKeyDown}
                value={search}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요 ..."/>
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    )
}