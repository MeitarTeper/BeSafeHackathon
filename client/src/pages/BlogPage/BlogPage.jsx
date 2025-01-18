import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './BlogPage.css';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const blogPosts = [
    {
      id: 1,
      title: "איך להגן על ילדים מפני הונאות פישינג?",
      excerpt: "מדריך מקיף להורים על זיהוי והתמודדות עם הונאות פישינג",
      image: "/api/placeholder/400/250",
      category: "אבטחת מידע",
      date: "14 ינואר, 2025",
      slug: "phishing-protection-guide"
    },
    {
      id: 2,
      title: "בריונות ברשת: כיצד לזהות ולהתמודד",
      excerpt: "טיפים חשובים לזיהוי מוקדם והתמודדות עם תופעת הבריונות ברשת",
      image: "/api/placeholder/400/250",
      category: "יחסים חברתיים",
      date: "12 ינואר, 2025",
      slug: "cyberbullying-guide"
    },
    {
      id: 3,
      title: "הגדרות פרטיות ברשתות חברתיות",
      excerpt: "מדריך מעשי להגדרת פרטיות בטוחה ברשתות החברתיות הפופולריות",
      image: "/api/placeholder/400/250",
      category: "פרטיות",
      date: "10 ינואר, 2025",
      slug: "social-media-privacy"
    },
    {
      id: 4,
      title: "סיסמאות חזקות: למה זה חשוב?",
      excerpt: "הסבר על חשיבות הסיסמאות החזקות וכיצד ליצור אותן",
      image: "/api/placeholder/400/250",
      category: "אבטחת מידע",
      date: "8 ינואר, 2025",
      slug: "strong-passwords"
    },
    {
      id: 5,
      title: "שיתוף תמונות ברשת: מה מותר ומה אסור",
      excerpt: "כללים חשובים לשיתוף תמונות ברשת בצורה בטוחה ואחראית",
      image: "/api/placeholder/400/250",
      category: "פרטיות",
      date: "6 ינואר, 2025",
      slug: "safe-image-sharing"
    },
    {
      id: 6,
      title: "זמן מסך: איך לשמור על איזון",
      excerpt: "טיפים להורים על ניהול זמן המסך של ילדים בצורה בריאה",
      image: "/api/placeholder/400/250",
      category: "אורח חיים דיגיטלי",
      date: "4 ינואר, 2025",
      slug: "screen-time-balance"
    },
    {
      id: 7,
      title: "משחקים מקוונים: בטיחות והגנה",
      excerpt: "מדריך להורים על בטיחות ילדים במשחקים מקוונים",
      image: "/api/placeholder/400/250",
      category: "משחקים",
      date: "2 ינואר, 2025",
      slug: "online-gaming-safety"
    },
    {
      id: 8,
      title: "הכרויות ברשת: סכנות והתמודדות",
      excerpt: "מידע חשוב על סכנות הכרויות ברשת וכיצד להימנע מהן",
      image: "/api/placeholder/400/250",
      category: "יחסים חברתיים",
      date: "31 דצמבר, 2024",
      slug: "online-relationships"
    },
    {
      id: 9,
      title: "הגנה מפני וירוסים ותוכנות זדוניות",
      excerpt: "כיצד להגן על המחשב והמכשירים הניידים מפני תוכנות זדוניות",
      image: "/api/placeholder/400/250",
      category: "אבטחת מידע",
      date: "29 דצמבר, 2024",
      slug: "malware-protection"
    },
    {
      id: 10,
      title: "שימוש בטוח ברשתות WiFi ציבוריות",
      excerpt: "טיפים חשובים לגלישה בטוחה ברשתות WiFi ציבוריות",
      image: "/api/placeholder/400/250",
      category: "אבטחת מידע",
      date: "27 דצמבר, 2024",
      slug: "public-wifi-safety"
    },
    {
      id: 11,
      title: "דיווח על תוכן פוגעני",
      excerpt: "מדריך לזיהוי ודיווח על תכנים פוגעניים ברשת",
      image: "/api/placeholder/400/250",
      category: "בטיחות",
      date: "25 דצמבר, 2024",
      slug: "report-harmful-content"
    },
    {
      id: 12,
      title: "הורים מול טכנולוגיה: טיפים להדרכה נכונה",
      excerpt: "כיצד להדריך ילדים לשימוש נכון בטכנולוגיה",
      image: "/api/placeholder/400/250",
      category: "חינוך",
      date: "23 דצמבר, 2024",
      slug: "parent-tech-guide"
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchToggle = () => {
    setIsSearching(true);
  };

  const handleBlur = () => {
    if (!searchTerm) setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-rubik">
      <div className="max-w-7xl mx-auto px-4">
        {/* Blog Header */}
        <div className="text-center mb-12">
          {isSearching ? (
            <div className="max-w-xl mx-auto relative">
              <input
                type="text"
                placeholder="חיפוש כתבות..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={handleBlur}
                autoFocus
                className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          ) : (
            <h1
              className="text-4xl font-bold text-gray-900 mb-4 flex justify-center items-center gap-2 cursor-pointer flex-row-reverse"
              onClick={handleSearchToggle}
            >
              הבלוג של SafeNet
              <Search className="w-6 h-6 text-blue-600" />
            </h1>
          )}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-600 font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.date}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600">
                  {post.excerpt}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;