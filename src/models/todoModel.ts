import mongoose, { Document, model, Schema } from "mongoose";



interface TodoInterface extends Document {
    userId: mongoose.Types.ObjectId,
    content: string,
    completed: boolean
}


const TodoSchema = new Schema<TodoInterface>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})


export const TodoModel = mongoose.models.Todo || model<TodoInterface>('Todo', TodoSchema);