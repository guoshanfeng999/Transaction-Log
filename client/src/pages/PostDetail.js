import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">帖子详情</h1>
      <p>这里是帖子详情页面，帖子ID：{id}</p>
    </div>
  );
};

export default PostDetail; 