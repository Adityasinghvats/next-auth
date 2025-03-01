export default function UserProfile({params}){
    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <p>Profile page for {params.id}</p>
        </div>
    )
}