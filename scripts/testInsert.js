const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://sayeem:auSo7wenog9RKIUU@cluster0.iovemxo.mongodb.net/interactive_ai_learning?retryWrites=true&w=majority&appName=Cluster0';

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  studentName: { type: String, default: 'Anonymous' },
  studentEmail: { type: String, default: 'anonymous@example.com' },
  isAnswered: { type: Boolean, default: false },
  answer: { type: String, default: '' },
  askedAt: { type: Date, default: Date.now },
});

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema);

async function run() {
  try {
    await mongoose.connect(MONGODB_URI, { dbName: 'interactive_ai_learning' });
    console.log('Connected to MongoDB');

    const doc = await Question.create({
      question: 'Test insert from script - please remove',
      studentName: 'Script Tester',
      studentEmail: 'tester@example.com',
    });

    console.log('Inserted document id:', doc._id.toString());
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
