import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    image: String,
    category: String, // eg: 'Pizza', 'Drinks', etc.
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;
