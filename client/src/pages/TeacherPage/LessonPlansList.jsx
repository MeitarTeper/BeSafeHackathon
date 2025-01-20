import React from 'react';
import PropTypes from "prop-types";
import { Download, ChevronDown } from 'lucide-react';

const LessonPlansList = ({lessonPlans}) => {
    
    return (
        <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">רשימת מערכי שיעור</h2>
                    {lessonPlans.length > 0 ? (
                    <ul className="space-y-4">
                        {lessonPlans.map((plan, index) => (
                        <li key={index} className="bg-white shadow rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                            {plan.previewPhoto && (
                                <img
                                src={plan.previewPhoto}
                                alt={`Preview of ${plan.name}`}
                                className="w-20 h-20 object-cover rounded-md"
                                />
                            )}
                            <div>
                                <h3 className="text-xl font-bold">{plan.lessonName}</h3>
                                <p>גילאים: {plan.ageGroup}</p>
                                <p>זמן: {plan.time}</p>
                            </div>
                            <a
                                href={plan.url}
                                download={plan.fileName}
                                className="bg-[#1A659E] text-white px-8 py-3 rounded-full hover:bg-[#004E89] transition-colors inline-flex items-center gap-2"
                            >
                                <Download size={20} />
                                הורד
                            </a>
                            </div>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p className="text-gray-600">עדיין לא הועלו מערכי שיעור.</p>
                    )}
                </div>
    )
};

LessonPlansList.propTypes = {
    lessonPlans: PropTypes.func.isRequired,
  };

export default LessonPlansList;