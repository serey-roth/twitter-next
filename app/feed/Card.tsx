import Link from "next/link";

interface CardProps {
  id: number;
  title: string;
  content: string;
}

export function Card({ id, title, content }: CardProps) {
  return (
    <Link href={`/feed/${id}`}>
      <div className="rounded-md p-4 bg-white drop-shadow-md w-full group hover:bg-blue-500 transition-colors duration-500">
        <h1 className="font-medium text-lg text-gray-500 group-hover:text-white before:content-['*']">
          {title}
        </h1>
        <p className="text-sm truncate group-hover:text-white">{content}</p>
      </div>
    </Link>
  );
}
