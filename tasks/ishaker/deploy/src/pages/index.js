import Kafif from "@/assets/kafif.jpg"
import { Inter } from "next/font/google";
import {getPosts} from "@/lib/db";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const getServerSideProps = async () => {
    const posts = await getPosts()
    return {
        props: {
            posts
        },
        // revalidate: 10
    }
}

export default function Home({posts}) {
  return (
    <main className={`flex min-h-screen flex-col items-center gap-8 p-16 ${inter.className}`}>
        <div className="flex gap-4 items-center text-4xl font-mono">
            <img src={Kafif.src} className="w-20 rounded-full" />
            <span><span className="text-slate-500">Ишak</span>ep.ru</span>
        </div>
        <div className="rounded-2xl bg-slate-800 bg-opacity-50 w-2/3 p-4">
            <p className="text-xl mb-2">Последние статьи</p>
            <div className="flex flex-col gap-4">
                {posts.map((post, i)=><div key={i} className="flex flex-col rounded-xl bg-slate-700 p-2">
                    <img src={post.img} className="w-full max-h-96 object-cover rounded-lg" />
                    <Link href={`/read?id=${post.id}`} className="text-lg underline ">{post.title}</Link>
                    <span className="text-sm rounded-md bg-slate-800 w-fit p-1">Автор: {post.author}</span>
                </div>)}
            </div>
        </div>
    </main>
  );
}

export {getServerSideProps}