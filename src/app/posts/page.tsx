'use client';

import { useState, useEffect, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import Link from "next/link";


export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(false);

  // 投稿取得
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) console.error('取得エラー:', error);
      else setPosts(data);
    };
    fetchPosts();
  }, []);

  // 投稿送信
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const { error: insertError } = await supabase.from("posts").insert({
    title: newPost.title,
    body: newPost.body,
    // author_id: ログイン認証未実装のため省略
  });

  if (insertError) {
    console.error("投稿失敗エラー:", insertError);
    alert("投稿に失敗しました: " + insertError.message);
  } else {
    location.reload();
  }

  setLoading(false);
};

// returnの中身：これらを返す関数になっているということ
// すなわち，これを返す先がないため，type_error(load failed)を吐いていると見るべき
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">投稿ページ</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="タイトル"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <textarea
          placeholder="本文"
          value={newPost.body}
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          投稿する
        </button>
      </form>

      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4 border-b pb-2">
            <h2 className="text-xl font-semibold">
              <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p>{post.body}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.created_at).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
