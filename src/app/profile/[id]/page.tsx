/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
export default async function UserProfile({params} : any){
    const {id} = await params;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <div className="flex flex-col items-center justify-center max-h-max m-4 bg-gray-700 rounded-lg p-10">
                <h1 className="relative text-4xl mb-4">Profile</h1>
                <hr />
                <p className="text-2xl">Profile page for <span className="bg-red-500">{id}</span></p>
                <Link className="mt-4" href="/profile">Go to main profile</Link>
            </div>
        </div>
    )
}