import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';  // הוספת שורה זו
import './SafetyBlog.css';
const articles = [
  {
    id: 1,
    title: "מה לעשות אם פרצו לי לוואטסאפ",
    date: "12.01.2023",
    author: "יואב לוי",
    image: "https://www.israelhayom.co.il/wp-content/uploads/2024/08/14/14/%D7%95%D7%95%D7%90%D7%A6%D7%A1%D7%90%D7%A4-1280x640.jpg",
    description:
      "מה לעשות כאשר מישהו פורץ לחשבון הוואטסאפ שלך? המדריך המלא...",
  },
  {
    id: 2,
    title: "מה לעשות אם פרצו לי לפייסבוק?",
    date: "10.01.2023",
    author: "נועה כהן",
    image: "https://images.globes.co.il/images/NewGlobes/big_image_800/2018/c32_shutterstock800x392.20181002T160710.jpg",
    description:
      "השלבים לשחזור חשבון פייסבוק שנפרץ ושמירה על אבטחתו בצורה קלה...",
  },
  {
    id: 3,
    title: "מה לעשות אם פרצו לי לאינסטגרם",
    date: "08.01.2023",
    author: "רועי יצחק",
    image: "https://se-keys.com/wp-content/uploads/2023/10/%D7%AA%D7%9E%D7%95%D7%A0%D7%95%D7%AA-%D7%9C%D7%9E%D7%90%D7%9E%D7%A8%D7%99%D7%9D-%D7%A9%D7%9C-%D7%A1%D7%99-%D7%A7%D7%99%D7%96-29.jpg",
    description:
      "המדריך שיעזור לך לשחזר את חשבון האינסטגרם שלך ולמנוע פריצות...",
  },
  {
    id: 4,
    title: "מה לעשות כדי לשפר את הגדרות הפרטיות שלי ברשת",
    date: "07.01.2023",
    author: "דנה שחר",
    image: "https://www.ynet.co.il/PicServer5/2017/05/04/7759501/72302780991296640360no.jpg",
    description: "טיפים לשיפור הגדרות הפרטיות שלך ברשתות חברתיות...",
  },
  {
    id: 5,
    title: "מה לעשות אם חוויתי הטרדה ברשת",
    date: "05.01.2023",
    author: "יעל ברק",
    image: "https://pic1.calcalist.co.il/picserver3/crop_images/2019/08/20/928367/90974_0_0_640_320_0_xx-large.jpg",
    description:
      "איך להתמודד עם הטרדה ברשת ולדווח עליה בצורה נכונה וקלה...",
  },
  {
    id: 6,
    title: "איך לבחור סיסמאות חזקות ומאובטחות",
    date: "03.01.2023",
    author: "עמית כהן",
    image: "https://www.gov.il/BlobFolder/reports/password_privacy_strong/he/%D7%A1%D7%99%D7%A1%D7%9E%D7%90%D7%95%D7%AA.png",
    description: "המדריך השלם לבחירת סיסמאות שאי אפשר לפרוץ להן...",
  },
];

const SafetyBlog = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const toggleSearch = () => {
      setIsSearchActive(!isSearchActive);
      if (!isSearchActive) {
        setSearchQuery('');
      }
    };
  
    const filteredArticles = articles.filter(article => 
      article.title.includes(searchQuery) || 
      article.description.includes(searchQuery)
    );
  
    return (
      <div className="safety-blog">
        <header className="header">
          <button 
            className="menu-button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu size={24} />
          </button>
  
          <div className="search-container">
            {isSearchActive ? (
              <input
                type="text"
                className="search-input"
                placeholder="חיפוש..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            ) : (
              <div className="title-container" onClick={toggleSearch}>
                <h1 className="main-title">מה לעשות אם?</h1>
                <Search className="search-icon" size={20} />
              </div>
            )}
          </div>
  
          <div className="logo">SafetyNet</div>
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
  
        <main className="blog-content">
          {[0, 3].map((startIndex) => (
            <div className="article-row" key={startIndex}>
              <div className="main-article">
                <Link to={`/article/${filteredArticles[startIndex].id}`} className="article-card large">
                  <div className="article-image">
                    <img src={filteredArticles[startIndex].image} alt={filteredArticles[startIndex].title} />
                  </div>
                  <div className="article-content">
                    <h2 className="article-title">{filteredArticles[startIndex].title}</h2>
                    <p className="article-preview">{filteredArticles[startIndex].description}</p>
                    <div className="meta">
                      <span className="author">{filteredArticles[startIndex].author}</span>
                      <span className="date">{filteredArticles[startIndex].date}</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="side-articles">
                {filteredArticles.slice(startIndex + 1, startIndex + 3).map((article) => (
                  <Link to={`/article/${article.id}`} className="article-card small" key={article.id}>
                    <div className="article-image">
                      <img src={article.image} alt={article.title} />
                    </div>
                    <div className="article-content">
                      <h3 className="article-title">{article.title}</h3>
                      <p className="article-preview">{article.description}</p>
                      <div className="meta">
                        <span className="author">{article.author}</span>
                        <span className="date">{article.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  };

  export default SafetyBlog;