import Kafif from "@/assets/kafif.jpg";
import {Inter} from "next/font/google";
import {getPost} from "@/lib/db";
import Markdown from "react-markdown";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const getServerSideProps = async (ctx) => {
    const post = await getPost(ctx.query.id)||{content: "Not found"}
    return {
        props: {post}
    }
}

const ReadPage = ({post}) => {
    return (
        <main className={`flex min-h-screen flex-col items-center gap-8 p-16 ${inter.className}`}>
            <Link href="/" className="flex gap-4 items-center text-4xl font-mono">
                <img src={Kafif.src} className="w-20 rounded-full"/>
                <span><span className="text-slate-500">Ишak</span>ep.ru</span>
            </Link>
            <div className="rounded-2xl bg-slate-800 bg-opacity-50 w-2/3 p-4">
                <p className="text-2xl">{post.title}</p>
                <p className="text-sm">Автор: {post.author}</p>
                <img src={post.img} className="rounded-2xl my-2" />
                <Markdown className="prose">
                    {post.content}
                </Markdown>
            </div>
            <span className="text-xs text-slate-700">M41den &copy; vrnctf special</span>
        </main>
)}

export {
    getServerSideProps
}
export default ReadPage