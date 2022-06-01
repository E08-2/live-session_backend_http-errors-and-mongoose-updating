import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    treats: [
        {
            name: { type: String, required: true }
        }
    ]
})

const User = mongoose.model("User", userSchema);

export default User;