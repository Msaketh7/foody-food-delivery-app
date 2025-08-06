import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    name: { type: String,
        required: true
    },
    description: String,
    location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
},
image: String, // Cloudinary image URL
owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // If needed
isOpen: { type: Boolean, default: true },
}, 
{ 
    timestamps: true
});

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
