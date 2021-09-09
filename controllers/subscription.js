const SubscriptionCategories = require('../models/schema/subscription/category');

exports.addSubscriptionCategory = (req, res) => {
  const userId = req.user;
  const category = req.body.category;

  const newCategory = new SubscriptionCategories({
    userId: userId,
    name: category.name,
    icon: category.icon,
  });

  newCategory.save((err, category) => {
    if (err) throw err;
    res.status(200).json(category);
  });
};

exports.getSubscriptionCategories = (req, res) => {
  const userId = req.user;

  SubscriptionCategories.find({ userId: userId }, (err, categories) => {
    if (err) throw err;
    res.status(200).json(categories);
  });
};

exports.updateSubscriptionCategory = (req, res) => {
  const userId = req.user;
  const categoryId = req.query.categoryId;
  const category = req.body.category;

  SubscriptionCategories.findOneAndUpdate(
    { userId: userId, _id: categoryId },
    {
      name: category.name,
      icon: category.icon,
      lastUpdated: Date.now(),
    },
    (err, docs) => {
      if (err) throw err;
      if (docs) {
        SubscriptionCategories.findOne(
          { userId: userId, _id: categoryId },
          (err, category) => {
            if (err) throw err;
            res.status(201).json(category);
          }
        );
      }
    }
  );
};

exports.deleteSubscriptionCategory = (req,res) => { 
  const userId = req.user;
  const categoryId = req.query.categoryId;

  SubscriptionCategories.deleteOne({userId : userId, _id : categoryId },(err,category) => { 
    if(err)throw err; 
    res.status(201).json(category);
  })
}
