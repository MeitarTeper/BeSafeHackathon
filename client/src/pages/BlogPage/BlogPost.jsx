import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight, Calendar, Tag, Share2 } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams();
  
  const posts = {
    "phishing-protection-guide": {
      title: "איך להגן על ילדים מפני הונאות פישינג?",
      date: "14 ינואר, 2025",
      category: "אבטחת מידע",
      image: "/api/placeholder/800/400",
      content: `
        <p>
          הונאות פישינג הפכו לאחת הסכנות המשמעותיות ביותר ברשת, במיוחד עבור ילדים. 
          במאמר זה נסביר כיצד לזהות ניסיונות פישינג ואיך להגן על ילדיכם מפניהם.
        </p>

        <h2>מהו פישינג?</h2>
        <p>
          פישינג הוא ניסיון לגנוב מידע אישי רגיש (כמו סיסמאות, פרטי כרטיס אשראי וכו') 
          באמצעות התחזות לגורם אמין. התוקפים משתמשים בטכניקות שונות כדי לשכנע את הקורבן 
          למסור מידע או ללחוץ על קישורים זדוניים.
        </p>

        <h2>סימני אזהרה שכדאי להכיר</h2>
        <ul>
          <li>הודעות דחופות הדורשות פעולה מיידית</li>
          <li>שגיאות כתיב ודקדוק</li>
          <li>כתובות אימייל או אתרים חשודים</li>
          <li>בקשות למידע אישי</li>
        </ul>

        <h2>טיפים להגנה מפני פישינג</h2>
        <p>
          1. למדו את ילדיכם לא לפתוח קישורים או להוריד קבצים מגורמים לא מוכרים
        </p>
        <p>
          2. הסבירו להם שחברות אמיתיות לעולם לא יבקשו מידע אישי דרך אימייל
        </p>
        <p>
          3. עודדו אותם לשתף אתכם בכל דבר חשוד שהם נתקלים בו ברשת
        </p>
        <p>
          4. התקינו תוכנות אנטי-וירוס ומסנני אינטרנט מתאימים
        </p>

        <h2>מה לעשות אם נפלתם קורבן?</h2>
        <p>
          אם נפלתם קורבן להונאת פישינג, פעלו מיד:
          - שנו סיסמאות
          - דווחו לבנק אם נחשפו פרטי כרטיס אשראי
          - דווחו על האירוע לגורמי האכיפה
        </p>
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
    <div className="min-h-screen bg-gray-50 py-12">
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

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">שתפו את המאמר:</span>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;