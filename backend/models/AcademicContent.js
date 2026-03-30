const mongoose = require('mongoose');

// Define the content structure for each language
const contentSchema = {
  // Hero Section
  hero: {
    slides: [{
      title: {
        part1: String,
        part2: String,
        full: String // For single-line titles
      },
      description: String,
      image: String
    }],
    buttons: {
      joinWaitlist: String,
      explorePrograms: String
    }
  },

  // Why Choose Us Section
  whyChooseUs: {
    title: String,
    subtitle: String,
    features: [{
      icon: String,
      title: String,
      description: String
    }]
  },

  // Vision Section
  vision: {
    title: String,
    description1: String,
    description2: String,
    image: String,
    imageCaption: String
  },

  // Programs Section
  programs: {
    title: String,
    subtitle: String,
    clickHint: String,
    exploreButton: String,
    exploreAlert: String,
    keyHighlights: String,
    levels: [{
      name: String, // TVET, Undergraduate, Postgrad, Professional Training
      description: String,
      icon: String,
      programs: [{
        name: String,
        duration: String,
        description: String,
        highlights: [String]
      }]
    }]
  },

  // Admissions Process Section
  admissions: {
    title: String,
    subtitle: String,
    steps: [{
      title: String,
      description: String,
      icon: String
    }]
  },

  // Faculty & Research Section
  faculty: {
    title: String,
    subtitle: String,
    worldClassTitle: String,
    worldClassDescription: String,
    worldClassImage: String,
    researchTitle: String,
    researchDescription: String,
    researchImage: String,
    imageCaption: String,
    facultyMembers: [{
      name: String,
      title: String,
      description: String,
      image: String,
      expertise: [String]
    }],
    researchProjects: [{
      title: String,
      description: String,
      image: String,
      lead: String,
      status: {
        type: String,
        enum: ['ongoing', 'completed', 'planned']
      }
    }]
  },

  // CTA Section
  cta: {
    title: String,
    description: String,
    buttons: {
      joinWaitlist: String,
      contactUs: String
    }
  }
};

const academicContentSchema = new mongoose.Schema({
  // Multi-language support
  en: contentSchema,
  am: contentSchema,
  om: contentSchema,
  // Publish status for each language
  publishStatus: {
    en: { type: Boolean, default: true },
    am: { type: Boolean, default: true },
    om: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AcademicContent', academicContentSchema);
