const Category = require("../models/category")

exports.getCategorybyId = (req, res, next, id) => {

    Category.findById(id).exec((err, Category) => {
        if (err) {
            return res.status(400).json({
                error: "CAtegory not found"
            });
        }
        req.category = Category
    })

    next();
}


exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not able to save in DB"
            });
        }
        res.json({
            category
        });
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Error DB, No Category",
            });
        }
        return res.json(categories);
    });
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Category update failed",
            });
        }
        return res.json(updatedCategory);
    })
};

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category failed to delete",
            });
        }
        return res.json({
            message: "Successfully deleted"
        })
    })

};