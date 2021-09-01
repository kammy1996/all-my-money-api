const Account = require('../models/schema/records/account');
const Category = require('../models/schema/records/category');
const Label = require('../models/schema/records/label');
const Record = require('../models/schema/records/record');
const service = require('../services/records-common');

exports.addAccount = (req, res) => {
  const account = req.body.account;
  const userId = req.user;

  const newAccount = new Account({
    name: account.name,
    color: account.color,
    type: account.type,
    typeIcon: account.typeIcon,
    balance: account.balance,
    currency: account.currency,
    userId: userId,
  });

  newAccount.save((err, docs) => {
    if (err) throw err;
    res.status(200).json(docs);
  });
};

exports.updateAccount = (req, res) => {
  const account = req.body.account;
  const accountId = req.query.id;
  const userId = req.user;

  Account.findOneAndUpdate(
    { userId: userId, _id: accountId },
    {
      name: account.name,
      type: account.type,
      color: account.color,
      balance: account.balance,
      currency: account.currency,
      lastUpdated: Date.now(),
    },
    (err, docs) => {
      if (err) throw err;
      Account.findOne({ _id: docs._id }, (err, account) => {
        if (err) throw err;
        res.status(200).json(account);
      });
    }
  );
};

exports.deleteAccount = (req, res) => {
  const accountId = req.query.id;
  const userId = req.user;

  Account.deleteOne({ userId: userId, _id: accountId }, (err, docs) => {
    if (err) throw err;
    res.status(201).json(docs);
  });
};

exports.getAccounts = (req, res) => {
  const userId = req.user;

  Account.find({ userId: userId }, (err, docs) => {
    if (err) throw err;
    res.status(200).json(docs);
  });
};

exports.addCategory = (req, res) => {
  const category = req.body.category;
  const userId = req.user;

  const newCategory = new Category({
    name: category.name,
    icon: category.icon,
    userId: userId,
  });

  newCategory.save((err, docs) => {
    if (err) throw err;
    res.status(200).json(docs);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.body.category;
  const categoryId = req.query.id;
  const userId = req.user;

  Category.findOneAndUpdate(
    { userId: userId, _id: categoryId },
    {
      name: category.name,
      icon: category.icon,
      lastUpdated: Date.now(),
    },
    (err, docs) => {
      if (err) throw err;
      if (docs) {
        Category.findOne({ _id: docs._id }, (err, category) => {
          if (err) throw err;
          res.status(200).json(category);
        });
      }
    }
  );
};

exports.getCategories = (req, res) => {
  const userId = req.user;

  Category.find({ userId: userId }, (err, docs) => {
    if (err) throw err;
    res.status(200).json(docs);
  });
};

exports.deleteCategory = (req, res) => {
  const categoryId = req.query.id;
  const userId = req.user;

  Category.deleteOne({ userId: userId, _id: categoryId }, (err, docs) => {
    if (err) throw err;
    res.status(201).json(docs);
  });
};

exports.addLabel = (req, res) => {
  const label = req.body.label;
  const userId = req.user;

  const newLabel = new Label({
    name: label.name,
    color: label.color,
    userId: userId,
  });

  newLabel.save((err, label) => {
    if (err) throw err;
    res.status(200).json(label);
  });
};

exports.getLabels = (req, res) => {
  const userId = req.user;

  Label.find({ userId: userId }, (err, labels) => {
    if (err) throw err;
    res.status(200).json(labels);
  });
};

exports.updateLabel = (req, res) => {
  const label = req.body.label;
  const labelId = req.query.id;
  const userId = req.user;

  Label.findOneAndUpdate(
    { userId: userId, _id: labelId },
    {
      name: label.name,
      color: label.color,
      lastUpdated: Date.now(),
    },
    (err, docs) => {
      if (err) throw err;
      if (docs) {
        Label.findOne({ _id: docs._id }, (err, label) => {
          if (err) throw err;
          res.status(201).json(label);
        });
      }
    }
  );
};

exports.deleteLabel = (req, res) => {
  const labelId = req.query.id;
  const userId = req.user;

  Label.deleteOne({ userId: userId, _id: labelId }, (err, docs) => {
    if (err) throw err;
    res.status(201).json(docs);
  });
};



exports.addRecord = (req, res) => {
  const record = req.body.record;
  const userId = req.user;

  const newRecord = new Record({
    source: record.source,
    type: record.type,
    account: record.account,
    date: record.date,
    amount: record.amount,
    category: record.category,
    label: record.label,
    note: record.note,
    userId: userId,
  });

  newRecord.save((err, record) => {
    if (err) throw err;
    service.updateAccountBalance('add',userId, record.type,record.account, record.amount)
    res.status(200).json(record);
  });
};

exports.getTotalRecords = (req, res) => {
  const userId = req.user;

  Record.find({ userId: userId }, (err, records) => {
    if (err) throw err;
    res.status(200).json(records.length);
  });
};


exports.getRecords = (req, res) => {
  const userId = req.user;
  let order = req.query.order;
  let {offset,perPage} =  service.makePaginationProps(req.query.page,req.query.perPage)

  Record.find({ userId: userId })
    .sort({ _id: order })
    .skip(offset)
    .limit(perPage)
    .exec((err, records) => {
      if (err) throw err;
      res.status(200).json(records);
    });
};




exports.getTotalFilteredRecords = (req, res) => {
  const userId = req.user;
  const query = req.query.query;

  let params = service.makeObjectFromQuery(userId, query);
  Record.find({
    $and: [params],
  }).exec((err, records) => {
    if (err) throw err;
    res.status(200).json(records.length);
  });
};

exports.getTotalRecordsAsPerDate = (req, res) => {
  const userId = req.user;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;

  Record.find({
    $and: [{ userId: userId }, { date: { $gte: startDate, $lt: endDate } }],
  }).exec((err, records) => {
    if (err) throw err;
    res.status(200).json(records.length);
  });
};

exports.getRecordsAsPerDate = (req, res) => {
  const userId = req.user;
  let {offset,perPage} =  service.makePaginationProps(req.query.page,req.query.perPage)

  let order = req.query.order;
  let startDate = req.query.startDate;
  let endDate = req.query.endDate;

  Record.find({
    $and: [{ userId: userId }, { date: { $gte: startDate, $lt: endDate } }],
  })
    .sort({ _id: order })
    .skip(offset)
    .limit(perPage)
    .exec((err, records) => {
      if (err) throw err;
      res.status(200).json(records);
    });
};

exports.getFilteredRecords = async (req, res) => {
  const userId = req.user;
  const query = req.query.query;
  let {offset,perPage} =  service.makePaginationProps(req.query.page,req.query.perPage)

  let params = service.makeObjectFromQuery(userId, query);
  Record.find({
    $and: [params],
  })
    .skip(offset)
    .limit(perPage)
    .exec((err, docs) => {
      if (err) throw err;
      res.status(200).json(docs);
    });
};

exports.updateRecord = (req, res) => {
  const record = req.body.record;
  const recordId = req.query.id;
  const userId = req.user;

  Record.findOneAndUpdate(
    { userId: userId, _id: recordId },
    {
      source: record.source,
      type: record.type,
      account: record.account,
      date: record.date,
      amount: record.amount,
      category: record.category,
      label: record.label,
      note: record.note,
      lastUpdated: Date.now(),
    },
    (err, docs) => {
      if (err) throw err;
      if (docs) {
        Record.findOne({ _id: docs._id }, (err, record) => {
          if (err) throw err;
          service.updateAccountBalance('update',userId,record.type,record.account,record.amount)
          res.status(201).json(record);
        });
      }
    }
  );
};

exports.deleteRecord = (req, res) => {
  const recordId = req.query.id;
  const userId = req.user;

  Record.findOne({userId:userId,_id : recordId},(err,record) => { 
    if(err)throw err; 
    service.updateAccountBalance('delete',userId,record.type,record.account,record.amount)
    let currentRecord = record;
    Record.deleteOne({ userId: userId, _id: recordId }, (err) => {
      if (err) throw err;
      res.status(201).json(currentRecord);
    });
  })
};
