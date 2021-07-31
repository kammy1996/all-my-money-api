const Account = require('../models/schema/records/accounts');

exports.addAccount =(req,res) => {
  const account = req.body.account;

  const newAccount = new Account({ 
    name : account.name,
    color:account.color,
    type:account.type,
    startBalance: account.startBalance,
    currency:account.currency
  })

  newAccount.save((err,docs) => { 
    if(err)throw err; 
    res.status(200).json(docs);
  })
}

exports.updateAccount =(req,res) => { 
  const account = req.body.account;
  const accountId = req.query.id;

  Account.findOneAndUpdate({_id : accountId}, {
      name: account.name,
      type:account.type,
      color:account.color,
      startBalance:account.startBalance,
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

  Account.deleteOne({_id : accountId}, (err,docs) => {
    if(err)throw err; 
    res.status(201).json(docs)
  })
}

exports.getAccounts = (req,res) => { 
  Account.find((err,docs) => {
    if(err)throw err; 
    res.status(200).json(docs)
  })
}



