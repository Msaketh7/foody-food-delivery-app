export default function UserProfile({ params }: any) {
    return (
        <div>
            <h1>User</h1>
            <p >Profile ID: {params.id}</p>
        </div>
    );
}