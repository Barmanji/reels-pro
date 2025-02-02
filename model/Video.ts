import mongoose, { model, Schema, models } from "mongoose"; // model for creating new, models for giving an array of all models

export const VIDEO_DIMENSION = {
    width: 1080,
    height: 1920,
} as const // read what is as const?

export interface IVideo{
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    controls?: boolean;
    transformation?: {
        height: number;
        width: number;
        quality?: number;
    }
    //duration: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    videoUrl: {type: String, required: true},
    thumbnailUrl: {type: String, required: true},
    controls: {type: Boolean, default: true},
    transformation: {
        height: {type: Number, default: VIDEO_DIMENSION.height},
        width: {type: Number, default: VIDEO_DIMENSION.width},
        quality: {type: Number, min: 1, max: 100}
    }
}, {timestamps: true})

const Video = models?.Video || model<IVideo>("Video", videoSchema)
export default Video;
