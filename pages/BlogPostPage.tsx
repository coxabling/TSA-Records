import React from 'react';
import { blogData } from '../data/blogData';

interface BlogPostPageProps {
  slug: string;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug }) => {
  const post = blogData.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Post not found!</h1>
        <a href="#/blog" className="mt-4 inline-block text-electric-blue hover:underline">Back to Blog</a>
      </div>
    );
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center">
            <a href="#/blog" className="text-sm font-semibold leading-7 text-neon-purple hover:text-violet-400">
                &larr; Back to blog
            </a>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-8 text-gray-400">{post.description}</p>
            <div className="mt-6 flex items-center justify-center gap-x-4">
                <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                    <p className="font-semibold text-white">{post.author.name}</p>
                    <time dateTime={post.datetime} className="text-gray-500">{post.date}</time>
                </div>
            </div>
        </div>

        <figure className="mt-16">
            <img
                className="aspect-video rounded-xl bg-gray-50 object-cover w-full"
                src={post.imageUrl}
                alt=""
            />
        </figure>

        <div 
            className="mt-10 prose prose-invert prose-lg text-gray-300 mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </div>
  );
};

export default BlogPostPage;
