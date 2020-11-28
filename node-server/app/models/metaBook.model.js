module.exports = (mongoose) => {
    const MetaBook = mongoose.model(
        'metaBook',
        mongoose.Schema(
            {
                asin: String,
                title: String,
                price: Number,
                imUrl: String,
                related: {
                    also_brought: [String],
                    also_viewed: [String],
                    brought_together: [String],
                },
                salesRank: {},
                brand: String,
                categories: [[String]],
            },
            { timestamps: false }
        )
    );

    return MetaBook;
};
