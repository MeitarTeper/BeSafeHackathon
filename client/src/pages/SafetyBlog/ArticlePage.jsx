// ArticlePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { articlesContent } from './articleContent';
import './ArticlePage.css';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', content: '' });
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const articleData = articlesContent[id];
    if (!articleData) {
      navigate('/blog');
      return;
    }
    setArticle(articleData);
  }, [id, navigate]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.name.trim() && newComment.content.trim()) {
      const comment = {
        ...newComment,
        date: new Date().toLocaleDateString('he-IL'),
        id: Date.now()
      };
      setComments([comment, ...comments]);
      setNewComment({ name: '', content: '' });
    }
  };

  if (!article) return null;

  return (
    <div className="article-page">
      <header className="header">
        <button 
          className="menu-button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu size={24} />
        </button>

        <div className="logo center">SafetyNet</div>
      </header>

      {isSidebarOpen && (
        <nav className="sidebar">
          <ul>
            <li><a href="/">דף הבית</a></li>
            <li><a href="/about">אודות</a></li>
            <li><a href="/blog">בלוג</a></li>
            <li><a href="/contact">צור קשר</a></li>
          </ul>
        </nav>
      )}

      <main className="article-content">
        <article>
          <div className="article-header">
            <div className="meta">
              <span className="author">{article.author}</span>
              <span className="date">{article.date}</span>
            </div>
            <h1 className="article-title">{article.title}</h1>
          </div>

          <div className="article-body">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="comments-section">
            <h2>תגובות</h2>
            
            <form className="comment-form" onSubmit={handleCommentSubmit}>
              <input
                type="text"
                placeholder="שם"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                required
              />
              <textarea
                placeholder="התגובה שלך..."
                value={newComment.content}
                onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                required
              />
              <button type="submit">שלח תגובה</button>
            </form>

            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">{comment.name}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ArticlePage;