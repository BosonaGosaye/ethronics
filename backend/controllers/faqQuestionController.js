const FAQQuestion = require('../models/FAQQuestion');
const FAQItem = require('../models/FAQItem');

// Submit a new FAQ question (public)
exports.submitQuestion = async (req, res) => {
  try {
    const { name, email, question, language = 'en' } = req.body;

    if (!name || !email || !question) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and question are required'
      });
    }

    const faqQuestion = new FAQQuestion({
      name,
      email,
      question,
      language
    });

    await faqQuestion.save();

    res.status(201).json({
      success: true,
      message: 'Question submitted successfully! We will get back to you soon.',
      data: faqQuestion
    });
  } catch (error) {
    console.error('Error submitting FAQ question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit question'
    });
  }
};

// Get all FAQ questions (admin)
exports.getAllQuestions = async (req, res) => {
  try {
    const { status, search, isImportant } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (isImportant === 'true') {
      query.isImportant = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { question: { $regex: search, $options: 'i' } }
      ];
    }

    const questions = await FAQQuestion.find(query)
      .populate('repliedBy', 'name email')
      .populate('faqItemId', 'translations.en.question')
      .sort({ isImportant: -1, createdAt: -1 });

    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error fetching FAQ questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions'
    });
  }
};

// Get single FAQ question (admin)
exports.getQuestion = async (req, res) => {
  try {
    const question = await FAQQuestion.findById(req.params.id)
      .populate('repliedBy', 'name email')
      .populate('faqItemId', 'translations');

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error fetching FAQ question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch question'
    });
  }
};

// Reply to FAQ question (admin)
exports.replyToQuestion = async (req, res) => {
  try {
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({
        success: false,
        message: 'Reply is required'
      });
    }

    const question = await FAQQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    question.reply = reply;
    question.status = 'replied';
    question.repliedBy = req.user._id;
    question.repliedAt = new Date();

    await question.save();

    // TODO: Send email notification to user with reply

    res.json({
      success: true,
      message: 'Reply sent successfully',
      data: question
    });
  } catch (error) {
    console.error('Error replying to question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply'
    });
  }
};

// Toggle important status (admin)
exports.toggleImportant = async (req, res) => {
  try {
    const question = await FAQQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    question.isImportant = !question.isImportant;
    await question.save();

    res.json({
      success: true,
      message: `Question marked as ${question.isImportant ? 'important' : 'not important'}`,
      data: question
    });
  } catch (error) {
    console.error('Error toggling important status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
};

// Convert question to FAQ item (admin)
exports.convertToFAQ = async (req, res) => {
  try {
    const { answer, translations } = req.body;

    const question = await FAQQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    if (question.convertedToFAQ) {
      return res.status(400).json({
        success: false,
        message: 'Question already converted to FAQ'
      });
    }

    // Create FAQ item
    const faqItem = new FAQItem({
      order: 0,
      isPublished: false,
      isFeatured: false,
      translations: translations || {
        en: {
          question: question.question,
          answer: answer || '',
          tags: []
        },
        am: {
          question: question.question,
          answer: answer || '',
          tags: []
        },
        om: {
          question: question.question,
          answer: answer || '',
          tags: []
        }
      }
    });

    await faqItem.save();

    // Update question
    question.convertedToFAQ = true;
    question.faqItemId = faqItem._id;
    question.status = 'converted';
    await question.save();

    res.json({
      success: true,
      message: 'Question converted to FAQ item successfully',
      data: {
        question,
        faqItem
      }
    });
  } catch (error) {
    console.error('Error converting to FAQ:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to convert to FAQ'
    });
  }
};

// Update question status (admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const question = await FAQQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    if (status) {
      question.status = status;
    }

    if (notes !== undefined) {
      question.notes = notes;
    }

    await question.save();

    res.json({
      success: true,
      message: 'Question updated successfully',
      data: question
    });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update question'
    });
  }
};

// Delete FAQ question (admin)
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await FAQQuestion.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete question'
    });
  }
};

// Get statistics (admin)
exports.getStatistics = async (req, res) => {
  try {
    const total = await FAQQuestion.countDocuments();
    const pending = await FAQQuestion.countDocuments({ status: 'pending' });
    const replied = await FAQQuestion.countDocuments({ status: 'replied' });
    const converted = await FAQQuestion.countDocuments({ status: 'converted' });
    const important = await FAQQuestion.countDocuments({ isImportant: true });

    res.json({
      success: true,
      data: {
        total,
        pending,
        replied,
        converted,
        important
      }
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};
