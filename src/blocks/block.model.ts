import mongoose from "mongoose";

export interface BlockInterface {
  name: string;
  description: string;
  cr: number;
}

interface BlockDoc extends mongoose.Document {
  name: string;
  description: string;
  cr: number;
}

interface BlockModelInterface extends mongoose.Model<BlockDoc> {
  build(block: BlockInterface): BlockDoc;
}

const blockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cr: {
    type: Number,
    required: true,
  },
}, { optimisticConcurrency: true });

blockSchema.pre('save', function (next) {
  this.increment();
  return next();
});

blockSchema.statics.build = (attr: BlockInterface) => { return new Block(attr) };

export const Block = mongoose.model<BlockDoc, BlockModelInterface>('block', blockSchema);