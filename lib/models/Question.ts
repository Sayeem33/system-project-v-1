import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  studentName: { type: String, default: 'Anonymous' },
  studentEmail: { type: String, default: 'anonymous@example.com' },
  isAnswered: { type: Boolean, default: false },
  answer: { type: String, default: '' },
  askedAt: { type: Date, default: Date.now },
});

const Question = models.Question || model('Question', QuestionSchema);

export default Question;
