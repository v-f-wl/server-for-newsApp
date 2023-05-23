import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    avatarUrl: String,
  },
  // это выполняет уже сама схема
  {
    timestamps: true
  }
)
// первый параметр - как она будет называться, второе поле указываем схему 
export default mongoose.model('Post', PostSchema)