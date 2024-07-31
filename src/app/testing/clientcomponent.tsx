"use client";

export function ClientComponent({ addPortfolio } : any){
    console.log("client");
    return (
        <div className="container w-[100%] h-[2000px] flex justify-center gap-5">
            <form action={(event) => addPortfolio(event)} onSubmit={() => {
                console.log("submitted");
            }}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Name"/>
                <button type="submit">Submit</button>
            </form>
            <h1>{}</h1>
        </div>
    )
}