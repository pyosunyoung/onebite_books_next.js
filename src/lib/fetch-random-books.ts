export default async function fetchRandomBooks(){
    const url = `https://onebite-books-server-main-ten-woad.vercel.app/book/random`;

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error()
        }

        return await response.json()
    }catch(err){
        console.error(err);
        return [];
    }
}