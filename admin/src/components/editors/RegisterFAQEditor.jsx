import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const RegisterFAQEditor = ({ contentByLanguage, onContentChange, currentLanguage }) => {
  const content = contentByLanguage[currentLanguage] || { title: '', questions: [] };
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleChange = (field, value) => {
    onContentChange(currentLanguage, { ...content, [field]: value });
  };

  const handleAddQuestion = () => {
    const newQuestions = [...(content.questions || []), { question: '', answer: '' }];
    onContentChange(currentLanguage, { ...content, questions: newQuestions });
    setExpandedIndex(newQuestions.length - 1);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...content.questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    onContentChange(currentLanguage, { ...content, questions: newQuestions });
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = content.questions.filter((_, i) => i !== index);
    onContentChange(currentLanguage, { ...content, questions: newQuestions });
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          FAQ Section Title *
        </label>
        <input
          type="text"
          value={content.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., Frequently Asked Questions"
          required
        />
      </div>

      {/* FAQ Questions */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            FAQ Questions ({(content.questions || []).length} items)
          </label>
          <button
            onClick={handleAddQuestion}
            className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>

        <div className="space-y-3">
          {(content.questions || []).map((faq, index) => (
            <div key={index} className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
              {/* Question Header */}
              <div className="flex items-center justify-between p-3 bg-gray-100">
                <button
                  onClick={() => toggleExpand(index)}
                  className="flex items-center space-x-2 flex-1 text-left"
                >
                  {expandedIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {faq.question || `Question ${index + 1} (empty)`}
                  </span>
                </button>
                <button
                  onClick={() => handleRemoveQuestion(index)}
                  className="text-red-600 hover:text-red-700 ml-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Question Content */}
              {expandedIndex === index && (
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Question *
                    </label>
                    <input
                      type="text"
                      value={faq.question || ''}
                      onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter the question"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Answer *
                    </label>
                    <textarea
                      value={faq.answer || ''}
                      onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter the answer"
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          {(content.questions || []).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="mb-2">No FAQ questions added yet</p>
              <button
                onClick={handleAddQuestion}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                Add your first question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterFAQEditor;
