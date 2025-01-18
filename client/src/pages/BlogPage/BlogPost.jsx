import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Calendar, Tag, Share2, Copy } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const BlogPost = () => {
  const { slug } = useParams();
  
  const posts = {
    "phishing-protection-guide": {
      title: "איך להגן על ילדים מפני הונאות פישינג?",
      date: "14 ינואר, 2025",
      category: "אבטחת מידע",
      image: "/api/placeholder/800/400",
      content: `
        <p>בעידן שבו הילדים שלנו גולשים באינטרנט כמו שחקני פינג-פונג, נעים בין משחקי מחשב, רשתות חברתיות וצ'אטים עם חברים – חשוב שנכיר גם את הסכנות שמתלוות לכך. הונאות פישינג הן אחת מהן. הפושעים הדיגיטליים האלה יודעים בדיוק איך לדבר בשפה של הילדים, ובכמה קליקים, להפוך את המסכים התמימים שלהם למוקד של גניבת מידע.</p>

        <p>איך נזהרים? איך מסבירים לילדים שאינטרנט הוא לא רק מקום של חתולים חמודים וסרטונים מצחיקים? הנה כל מה שצריך לדעת – בכתבה שתשאיר אתכם דרוכים, אבל רגועים.</p>

        <h2>מה זה בכלל פישינג?</h2>
        <p>דמיינו דייג זורק חכה למים, מחכה לדג שיתפוס את הפיתיון. עכשיו תחליפו את הדג בילד שלכם ואת הפיתיון במייל או הודעה שנראים תמימים לחלוטין, ותקבלו הונאת פישינג.</p>

        <p>המטרה של הפושעים היא לגרום לילד (או למבוגר) ללחוץ על קישור, למסור מידע אישי, או אפילו להוריד תוכנה זדונית – וכל זה מבלי שהם ירגישו שמשהו לא בסדר.</p>

        <h2>איך הילדים נופלים בזה?</h2>
        <p>זה מתחיל עם הודעה שנראית אמינה לגמרי. אולי זה "מנהל המשחק" מבקש לעדכן סיסמה. אולי זו "חנות משחקים" שמבטיחה מטבעות וירטואליים בחינם. הילד רואה הצעה נוצצת, לוחץ – ונכנס למלכודת.</p>

        <p>פושעים יודעים בדיוק איפה הילדים מבלים באינטרנט. הם בונים הודעות שמכוונות למשחקים מקוונים, רשתות חברתיות ואפליקציות פופולריות, ומשתמשים באותה שפה שגורמת לילדים להרגיש שמישהו מבין אותם.</p>

        <h2>הטריקים הכי נפוצים בהונאות פישינג</h2>
        <ul>
          <li>"זכית בפרס!" ההודעה מבטיחה פרס מדהים – אולי מטבעות במשחק או מנוי חינם – ורק צריך ללחוץ על הקישור כדי לקבל אותו.</li>
          <li>"חשבון המשתמש שלך יינעל!" הודעות שמנסות להפחיד את הילד.</li>
          <li>"חבר רוצה לשחק איתך!" קישורים שמתחזים להזמנות ממשחקים, אבל בפועל מובילים לאתר מסוכן.</li>
        </ul>

        <h2>אז איך מלמדים את הילדים להיזהר?</h2>
        <p><b>שיחה פתוחה בגובה העיניים:</b> שבו איתם, הסבירו מה זה פישינג, ואיך אפשר לזהות אותו.</p>
        <p><b>תנו להם כלים לזהות הונאות:</b> בדקו יחד הודעות חשודות ושימו לב לשפה מלחיצה או שגיאות כתיב.</p>
        <p><b>לא לוחצים ולא משתפים:</b> למדו אותם לא ללחוץ על קישורים ממקורות לא מוכרים, ולא לשתף מידע אישי.</p>

        <h2>האם טכנולוגיה יכולה לעזור?</h2>
        <ul>
          <li>תוכנות פיקוח כמו Qustodio או Bark מאפשרות לעקוב אחרי פעילות האינטרנט של הילדים.</li>
          <li>אנטי-וירוס עדכני יכול לזהות ולמנוע קישורים זדוניים.</li>
          <li>שימוש באימות דו-שלבי מוסיף שכבת אבטחה נוספת לחשבונות הילדים.</li>
        </ul>

        <h2>מה לעשות אם הילד נפל קורבן?</h2>
        <p>אם גיליתם שהילד לחץ על קישור זדוני או מסר פרטים, פעלו במהירות:</p>
        <ul>
          <li>שנו סיסמאות לחשבונות שנפגעו.</li>
          <li>בדקו את חשבון הבנק על תנועות חשודות.</li>
          <li>דווחו על המקרה לפלטפורמה שבה קרתה ההונאה.</li>
        </ul>

        <h2>סיכום: האינטרנט יכול להיות מקום בטוח – אם נדע לשמור</h2>
        <p>האינטרנט מציע הזדמנויות מדהימות, אבל הוא גם דורש זהירות. עם הדרכה נכונה, הילדים יכולים לגלוש בבטחה ולהימנע מסכנות. כל קליק בטוח מתחיל בשיחה פתוחה!</p>
      `
    },
    "cyberbullying-guide": {
      title: "בריונות ברשת: כיצד לזהות ולהתמודד",
      date: "12 ינואר, 2025",
      category: "יחסים חברתיים",
      image: "/api/placeholder/800/400",
      content: `
        <p>
          בריונות ברשת היא תופעה מדאיגה שמשפיעה על ילדים ובני נוער רבים. 
          חשוב להכיר את הסימנים ולדעת כיצד להתמודד איתה.
        </p>

        <h2>מהי בריונות ברשת?</h2>
        <p>
          בריונות ברשת כוללת התנהגויות פוגעניות שמתרחשות במרחב הדיגיטלי, 
          כגון הטרדות, איומים, הפצת שמועות, והשפלות ברשתות החברתיות.
        </p>

        <h2>סימנים לבריונות ברשת</h2>
        <ul>
          <li>שינויים פתאומיים בהתנהגות</li>
          <li>הימנעות משימוש במכשירים דיגיטליים</li>
          <li>ירידה בביטחון העצמי</li>
          <li>שינויים במצב הרוח</li>
        </ul>

        <h2>כיצד להתמודד?</h2>
        <p>
          1. שמרו על תיעוד של כל האירועים
        </p>
        <p>
          2. דווחו על התוכן הפוגעני לפלטפורמה הרלוונטית
        </p>
        <p>
          3. שוחחו עם הילד ותנו לו תמיכה רגשית
        </p>
        <p>
          4. פנו לגורמים מקצועיים בבית הספר או ליועץ
        </p>

        <h2>מניעה וחינוך</h2>
        <p>
          חשוב לחנך לאמפתיה ולהתנהגות מכבדת ברשת.
          עודדו שיח פתוח על חוויות ברשת ובנו יחסי אמון.
        </p>
      `
    }
    // Add more posts as needed...
  };

  const post = posts[slug];

  // State for comments
  const [comments, setComments] = useState([
    { name: "דני", text: "מאמר מעולה! למדתי המון." },
    { name: "שירה", text: "חשוב מאוד להיזהר ברשת, במיוחד לילדים." },
    { name: "אורן", text: "אני משתמש באנטי-וירוס וזה עוזר מאוד." },
    { name: "מיכל", text: "המאמר הזה שינה לי את ההסתכלות על אינטרנט בטוח!" }
  ]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [expandedComment, setExpandedComment] = useState(null);
  const [visibleComments, setVisibleComments] = useState(3); // Number of visible comments

  const handleAddComment = () => {
    if (newComment.name && newComment.text) {
      setComments([newComment, ...comments]);
      setNewComment({ name: "", text: "" });
      setShowCommentForm(false);
    }
  };

  const handleShowMoreComments = () => {
    setVisibleComments((prev) => prev + 3); // Load 3 more comments
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(url);
        alert("הקישור הועתק!");
        break;
      case "facebook":
        window.open(`https://facebook.com/sharer/sharer.php?u=${url}`, "_blank");
        break;
      case "whatsapp":
        window.open(`https://wa.me/?text=${url}`, "_blank");
        break;
      case "instagram":
        alert("שיתוף באינסטגרם כרגע לא נתמך אוטומטית.");
        break;
      default:
        break;
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold">הכתבה לא נמצאה</h1>
          <a href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
            חזרה לבלוג
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-rubik">
      <article className="max-w-3xl mx-auto px-4">
        {/* Back to Blog */}
        <a
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:underline mb-8"
        >
          <ArrowRight className="w-4 h-4 ml-2" />
          חזרה לבלוג
        </a>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 ml-2" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 ml-2" />
              {post.category}
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleShare("copy")}
            >
              <Copy className="inline w-4 h-4" /> העתק קישור
            </button>
            <button
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleShare("facebook")}
            >
              <FaFacebookF className="inline w-4 h-4" /> שתף בפייסבוק
            </button>
            <button
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => handleShare("whatsapp")}
            >
              <FaWhatsapp className="inline w-4 h-4" /> שתף בוואטסאפ
            </button>
            <button
              className="p-2 bg-pink-500 text-white rounded hover:bg-pink-600"
              onClick={() => handleShare("instagram")}
            >
              <FaInstagram className="inline w-4 h-4" /> שתף באינסטגרם
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-lg mb-8"
        />

        {/* Article Content */}
        <div
          className="prose prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Comments Section */}
        <section className="mt-12 border border-orange-400 p-6 rounded">
          <h2 className="text-2xl font-bold text-right mb-4">תגובות</h2>
          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="p-2 bg-blue-500 text-white rounded mb-4"
          >
            הוסף תגובה
          </button>

          {showCommentForm && (
            <div className="mb-6 border rounded p-4 bg-gray-50">
              <input
                type="text"
                placeholder="שם"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                className="block w-full p-2 border rounded mb-2"
              />
              <textarea
                placeholder="תוכן התגובה"
                value={newComment.text}
                onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                className="block w-full p-2 border rounded mb-2"
                rows="3"
              ></textarea>
              <div className="flex justify-between">
                <button
                  onClick={handleAddComment}
                  className="p-2 bg-green-500 text-white rounded"
                >
                  שלח תגובה
                </button>
                <button
                  onClick={() => setShowCommentForm(false)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  סגור
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {comments.slice(0, visibleComments).map((comment, index) => (
              <div
                key={index}
                className={`p-4 border rounded bg-gray-50 ${
                  expandedComment === index ? "bg-orange-100" : ""
                }`}
                onClick={() =>
                  setExpandedComment(expandedComment === index ? null : index)
                }
              >
                <strong>{comment.name}</strong>:{" "}
                {expandedComment === index
                  ? comment.text
                  : comment.text.length > 30
                  ? comment.text.slice(0, 30) + "..."
                  : comment.text}
              </div>
            ))}
            {visibleComments < comments.length && (
              <button
                onClick={handleShowMoreComments}
                className="p-2 bg-blue-500 text-white rounded mt-4"
              >
                הצג תגובות נוספות
              </button>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};

export default BlogPost;