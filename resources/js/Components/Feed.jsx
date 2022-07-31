import { BiUser, BiHeart, BiComment, BiShare } from 'react-icons/all'
import { Link } from '@inertiajs/inertia-react'

export default function Feed({author, time, authorid, children, type, mediaUrl = ''}) {
    return (
        <div className="flex flex-col bg-slate-200 dark:bg-slate-700 px-3 py-3 rounded-xl gap-2">
            <div className="flex flex-row items-center gap-2">
                <Link href={`/profile/${authorid}`} className="flex w-8 h-8 bg-stone-600 rounded-full items-center justify-center text-white">
                    <BiUser />
                </Link>
                <div className="flex flex-col gap-0">
                    <Link href={`/profile/${authorid}`} className="font-bold plus-jakarta-sans">{author}</Link>
                    <span className="text-xs">{time}</span>
                </div>
            </div>
            <div className="md:ml-10">
                {
                    type === "text" ? <p>{children}</p> :
                    type === "image" ? <div className="flex flex-col gap-2"><img src={mediaUrl} /><p>{children}</p></div> :
                    <pre className="text-red-500 flex flex-row items-center bg-white dark:bg-slate-200 rounded"><pre className="rounded-l bg-red-600 px-2 py-1 text-white">ERROR</pre> 🐶 Content type is undefined or not recognized!</pre>

                }
            </div>
            <div className="rounded-b-xl -mx-3 -mb-3 md:pl-12 bg-slate-300 dark:bg-slate-600 p-3 flex flex-row gap-5">
                <button className="flex flex-row items-center hover:text-rose-600">
                    <BiHeart />
                </button>
                <button className="hover:text-emerald-500">
                    <BiComment />
                </button>
                <button>
                    <BiShare className="hover:text-yellow-500" />
                </button>
            </div>
        </div>
    )
}