const Account = require('../models/schema/records/account');
const Category = require('../models/schema/records/category');
const Label = require('../models/schema/records/label');
const Record = require('../models/schema/records/record');



exports.addAccount =(req,res) => {
  const account = req.body.account;
  const userId = req.user;

  const newAccount = new Account({ 
    name : account.name,
    color:account.color,
    type:account.type,
    typeIcon:account.typeIcon,
    balance: account.balance,
    currency:account.currency,
    userId : userId
  })

  newAccount.save((err,docs) => { 
    if(err)throw err; 
    res.status(200).json(docs);
  })
}

exports.updateAccount =(req,res) => { 
  const account = req.body.account;
  const accountId = req.query.id;
  const userId = req.user;

  Account.findOneAndUpdate({userId: userId, _id : accountId}, {
      name: account.name,
      type:account.type,
      color:account.color,
      balance:account.balance,
      currency:account.currency,
      lastUpdated:Date.now()
    },(err,docs) => {
    if(err)throw err; 
    Account.findOne({_id:docs._id},(err,account) => { 
      if(err) throw err;
      res.status(200).json(account);
    })
  })  
} 

exports.deleteAccount = (req,res) => { 
  const accountId = req.query.id;
  const userId = req.user;

  Account.deleteOne({userId:userId, _id : accountId}, (err,docs) => {
    if(err)throw err; 
    res.status(201).json(docs)
  })
}

exports.getAccounts = (req,res) => { 
  const userId = req.user;

  Account.find({userId: userId},(err,docs) => {
    if(err)throw err; 
    res.status(200).json(docs)
  })
}

exports.addCategory = (req,res) => { 
  const category = req.body.category;
  const userId = req.user;

  const newCategory = new Category({ 
    name: category.name,
    icon: category.icon,
    userId: userId
  })

  newCategory.save((err,docs) => {
    if(err)throw err; 
    res.status(200).json(docs)
  })
}

exports.updateCategory =(req,res) => { 
  const category = req.body.category;
  const categoryId = req.query.id;
  const userId = req.user;

  Category.findOneAndUpdate({userId: userId, _id : categoryId}, {
      name: category.name,
      icon:category.icon,
      lastUpdated:Date.now()
    },(err,docs) => {
    if(err) throw err; 
    if(docs) { 
      Category.findOne({_id:docs._id},(err,category) => { 
        
        if(err) throw err;
        res.status(200).json(category);
      })
    }
    
  })  
} 

exports.getCategories = (req,res) => {
  const userId = req.user;

  Category.find({userId: userId},(err,docs) => { 
    if(err)throw err; 
    res.status(200).json(docs)
  })
}

exports.deleteCategory = (req,res) => { 
  const categoryId = req.query.id;
  const userId = req.user;

  Category.deleteOne({userId:userId, _id : categoryId}, (err,docs) => {
    if(err)throw err; 
    res.status(201).json(docs)
  })
}

exports.addLabel = (req,res) => { 
  const label = req.body.label;
  const userId = req.user;

  const newLabel = new Label({
    name:label.name,
    color:label.color,
    userId: userId
  })

  newLabel.save((err,label) => { 
    if(err)throw err; 
    res.status(200).json(label)
  })

}

exports.getLabels = (req,res) => { 
  const userId = req.user;

  Label.find({ userId : userId}, (err,labels) => { 
    if(err)throw err; 
     res.status(200).json(labels) 
  })
}

exports.updateLabel =(req,res) => { 
  const label = req.body.label;
  const labelId = req.query.id;
  const userId = req.user;

  Label.findOneAndUpdate({userId: userId, _id : labelId}, {
      name: label.name,
      color:label.color,
      lastUpdated:Date.now()
    },(err,docs) => {
    if(err) throw err; 
    if(docs) { 
      Label.findOne({_id:docs._id},(err,label) => {  
        if(err) throw err;
        res.status(201).json(label);
      })
    }
    
  })  
} 

exports.deleteLabel = (req,res) => { 
  const labelId = req.query.id;
  const userId = req.user;

  Label.deleteOne({userId:userId, _id : labelId}, (err,docs) => {
    if(err)throw err; 
    res.status(201).json(docs)
  })
}

exports.addRecord = (req,res) => { 
  const record = req.body.record;
  const userId = req.user;
  console.log(`record `, record)

  const newRecord = new Record({ 
    source : record.source,
    type : record.type,
    account: record.account,
    date:record.date,
    amount:record.amount,
    category : record.category,
    label:record.label,
    note:record.note,
    lastUpdated: Date.now(),
    userId:userId
  })

  newRecord.save((err,record) => { 
    if(err)throw err; 
    res.status(200).json(record);
  })
}


