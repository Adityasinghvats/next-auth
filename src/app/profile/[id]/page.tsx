export default function UserProfile({params}){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page for <span className="bg-red-500">{params.id}</span></p>
        </div>
    )
}