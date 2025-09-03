import mongoose, { Document, Schema } from "mongoose";


interface SessionInterface extends Document {
    userId: mongoose.Types.ObjectId,
}


const SessionSchema = new Schema<SessionInterface>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
})


export const SessionModel = mongoose.models.Session || mongoose.model<SessionInterface>('Session', SessionSchema);


