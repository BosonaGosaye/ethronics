const mongoose = require('mongoose');
require('dotenv').config();

const Job = require('../models/Job');

async function migrateJobs() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    console.log('\n📊 Fetching all jobs...');
    const jobs = await Job.find({});
    console.log(`Found ${jobs.length} jobs to migrate`);

    if (jobs.length === 0) {
      console.log('No jobs to migrate');
      process.exit(0);
    }

    let migratedCount = 0;

    for (const job of jobs) {
      let needsUpdate = false;
      const updates = {};

      // Company fields
      if (!job.companyWebsite) {
        updates.companyWebsite = '';
        needsUpdate = true;
      }
      if (!job.companySize) {
        updates.companySize = '';
        needsUpdate = true;
      }
      if (!job.companyIndustry) {
        updates.companyIndustry = '';
        needsUpdate = true;
      }

      // Job details
      if (!job.workMode) {
        updates.workMode = 'onsite';
        needsUpdate = true;
      }
      if (!job.experienceLevel) {
        updates.experienceLevel = 'mid';
        needsUpdate = true;
      }
      if (!job.yearsOfExperience) {
        updates.yearsOfExperience = '';
        needsUpdate = true;
      }
      if (!job.educationLevel) {
        updates.educationLevel = 'bachelor';
        needsUpdate = true;
      }

      // Compensation
      if (job.salaryMin === undefined) {
        updates.salaryMin = 0;
        needsUpdate = true;
      }
      if (job.salaryMax === undefined) {
        updates.salaryMax = 0;
        needsUpdate = true;
      }
      if (!job.salaryCurrency) {
        updates.salaryCurrency = 'USD';
        needsUpdate = true;
      }
      if (!job.salaryPeriod) {
        updates.salaryPeriod = 'yearly';
        needsUpdate = true;
      }

      // Job specifics
      if (!job.numberOfPositions) {
        updates.numberOfPositions = 1;
        needsUpdate = true;
      }
      if (!job.duration) {
        updates.duration = '';
        needsUpdate = true;
      }

      // Benefits
      if (job.travelRequired === undefined) {
        updates.travelRequired = false;
        needsUpdate = true;
      }
      if (job.relocationAssistance === undefined) {
        updates.relocationAssistance = false;
        needsUpdate = true;
      }
      if (job.visaSponsorship === undefined) {
        updates.visaSponsorship = false;
        needsUpdate = true;
      }

      // Contact
      if (!job.contactEmail) {
        updates.contactEmail = '';
        needsUpdate = true;
      }
      if (!job.contactPhone) {
        updates.contactPhone = '';
        needsUpdate = true;
      }
      if (!job.contactPerson) {
        updates.contactPerson = '';
        needsUpdate = true;
      }

      // Multilingual fields - ensure all arrays and strings exist
      ['en', 'am', 'om'].forEach(lang => {
        if (!job.translations[lang].responsibilities) {
          updates[`translations.${lang}.responsibilities`] = [];
          needsUpdate = true;
        }
        if (!job.translations[lang].qualifications) {
          updates[`translations.${lang}.qualifications`] = [];
          needsUpdate = true;
        }
        if (!job.translations[lang].niceToHave) {
          updates[`translations.${lang}.niceToHave`] = [];
          needsUpdate = true;
        }
        if (!job.translations[lang].companyDescription) {
          updates[`translations.${lang}.companyDescription`] = '';
          needsUpdate = true;
        }
        if (!job.translations[lang].applicationProcess) {
          updates[`translations.${lang}.applicationProcess`] = '';
          needsUpdate = true;
        }
        if (!job.translations[lang].interviewProcess) {
          updates[`translations.${lang}.interviewProcess`] = '';
          needsUpdate = true;
        }
        if (!job.translations[lang].bonusInfo) {
          updates[`translations.${lang}.bonusInfo`] = '';
          needsUpdate = true;
        }
      });

      if (needsUpdate) {
        await Job.findByIdAndUpdate(job._id, { $set: updates });
        migratedCount++;
        console.log(`✅ Migrated job: ${job.translations.en.title}`);
      } else {
        console.log(`⏭️  Skipped job (already up to date): ${job.translations.en.title}`);
      }
    }

    console.log(`\n✅ Migration complete!`);
    console.log(`📊 Total jobs: ${jobs.length}`);
    console.log(`🔄 Migrated: ${migratedCount}`);
    console.log(`⏭️  Skipped: ${jobs.length - migratedCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateJobs();
