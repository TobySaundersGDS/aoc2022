export async function fetchInput(url: string){
    let headers = {
        Cookie: process.env.AOCSESSION
    }
    const res = await fetch(url, { credentials: 'include', headers });
    const data = await res.text();
    if (res.ok) {
        return data;
    }else{
        Promise.reject(new Error(`No data found`));
    }
}
