import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "MenuItem"
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    deliveryAddress: {
    label: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String
},
status: {
    type: String,
    enum: ["pending", "Placed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
    default: "pending"
},
paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
},
    paymentMethod: {
        type: String,
        enum: ["Cash", "Card", "Online"],
        default: "Cash"
    },
    orderedAt: {
    type: Date,
    default: Date.now,
    required: true
    },
},
{ 
    timestamps: true
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
