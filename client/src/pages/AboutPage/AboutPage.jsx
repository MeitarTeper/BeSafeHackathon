import React from 'react';
import PropTypes from 'prop-types'; // ייבוא PropTypes
import { Shield, Users, BookOpen, Award } from 'lucide-react';
import noaImage from "../../assets/images/us/noa.jpeg";
import estiImage from "../../assets/images/us/Esti.jpg";
import hadarImage from "../../assets/images/us/Hadar.jpg";
import meitarImage from "../../assets/images/us/Meitar.jpg";
import chenImage from "../../assets/images/us/Chen.jpg";

const AboutPage = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "בטיחות ברשת",
      description: "אנו מחויבים לספק כלים וידע להתנהלות בטוחה ברשת האינטרנט",
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "חינוך דיגיטלי",
      description: "מלמדים ילדים והורים כיצד להתמודד עם אתגרי העולם הדיגיטלי",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-600" />,
      title: "למידה אינטראקטיבית",
      description: "שיטות למידה חווייתיות המותאמות לילדים ולמערכת החינוך",
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "תעודת הסמכה",
      description: "מעניקים תעודות הסמכה לבטיחות ברשת לתלמידים וכיתות",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">אודות SafeNet</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              אנחנו מאמינים שכל ילד צריך לדעת כיצד להתנהל בבטחה ברשת.
              המשימה שלנו היא להנגיש את הידע הזה בצורה חווייתית ומהנה.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-6">
                <div className="shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">החזון שלנו</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              אנו שואפים ליצור סביבת אינטרנט בטוחה יותר עבור ילדינו, באמצעות
              חינוך, העלאת מודעות וכלים פרקטיים להתמודדות עם אתגרי העולם
              הדיגיטלי. אנחנו מאמינים שבאמצעות שיתוף פעולה עם מערכת החינוך,
              נוכל להגיע לכל ילד וילדה ולהעניק להם את הכלים הנחוצים לגלישה בטוחה.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 team-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">הצוות שלנו</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <TeamMember name="נעה מוסקטו" role="תפקיד" image={noaImage} />
            <TeamMember name="הדר דבוש" role="תפקיד" image={hadarImage} />
            <TeamMember name="אסתי כהן" role="תפקיד" image={estiImage} />
            <TeamMember name="חן קושלביץ'" role="תפקיד" image={chenImage} />
            <TeamMember name="מיתר טפר" role="תפקיד" image={meitarImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamMember = ({ name, role, image }) => (
  <div className="text-center">
    <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
      {image && <img src={image} alt={name} className="w-full h-full object-cover" />}
    </div>
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </div>
);

// הגדרת propTypes
TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default AboutPage;
