const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_code : Number,
    display_name: String,
    manufacturer_id: Number,
    manufacturer_name: String,
    availability_status: String,
    schedule: String,
    max_qty_in_order: Number,
    mrp: Number,
    selling_price: Number,
    discount: Number,
    in_stock: Number,
    popularity: Number,
    brand_id: Number,
    brand: String,
    url_path: String,
    is_cold_storage: Number,
    rx_required: Number,
    pack_size: String,
    best_price: Number,
    manufacturer_url_path: String,
    brand_url_path: String,
    rating_avg: String,
    image_url: String,
    thumbnail_url: String,
    imagerelative_url: String,
    categories: [String]
});

module.exports = mongoose.model("product", productSchema);
