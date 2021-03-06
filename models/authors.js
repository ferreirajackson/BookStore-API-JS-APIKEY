const db = require("../db")();
const COLLECTION = "authors";
const LOOKUP_BOOKS_PIPELINE = [{
    $lookup: {
        from: "books",
        localField: "id",
        foreignField: "author",
        as: "books",
    },
}, ];
module.exports = () => {
    const get = async(id = null) => {
        console.log(' inside authors model');
        if (!id) {
            const authors = await db.get(COLLECTION);
            return authors;
        }
        const authors = await db.get(COLLECTION, { id });
        return authors;
    }
    const add = async(name) => {
        const authorCount = await db.count(COLLECTION);
        const results = await db.add(COLLECTION, {
            id: authorCount + 1,
            name: name
        });
        return results.result;
    }
    const aggregateWithBooks = async() => {
        const authors = await db.aggregate(COLLECTION, LOOKUP_BOOKS_PIPELINE);
        return authors;
    };
    const AGG = async(idi) => {
        const LOOKUP_BOOKS_PIPELINE_2 = [{
                $lookup: {
                    from: "books",
                    localField: "id",
                    foreignField: "author",
                    as: "books",
                },
            },
            {
                $match: {
                    id: parseInt(idi),
                }
            },
        ];
        console.log(idi)
        console.log("got to the models")
        console.log(LOOKUP_BOOKS_PIPELINE_2)

        const authors = await db.aggregate(COLLECTION, LOOKUP_BOOKS_PIPELINE_2);
        return authors;
    };
    return {
        get,
        add,
        aggregateWithBooks,
        AGG,
    };
};