export default function FeedLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full max-w-screen sm:max-w-lg">
            <div className="flex flex-col gap-2 relative">
                <h1 className="font-bold text-xl">Twitter Feed</h1>
                {children}
            </div>
        </div>
    )
}