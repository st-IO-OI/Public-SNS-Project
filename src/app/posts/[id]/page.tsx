// src/app/posts/[id]/page.tsx

import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

type PostPageProps = {
  params: { id: string };
};

export default async function PostPage({ params }: PostPageProps) {
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, body, created_at")
    .eq("id", params.id)
    .single();

  if (error || !post) {
    return notFound(); // 404 ページを自動表示
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 whitespace-pre-line mb-6">{post.body}</p>
      <p className="text-sm text-gray-500">
        投稿日時: {new Date(post.created_at).toLocaleString()}
      </p>
    </div>
  );
}
