function app(doc) {
  console.log("doc", doc);
  let importDoc = Object.assign({}, doc);
  let oldPurchase = Purchase.findOne({ itemId: doc.itemId });
  if (!oldPurchase) {
    importDoc.remains = 0;
    Import.insert(importDoc);
    return Purchase.insert(doc);
  } else {
    importDoc.remains = oldPurchase.qty;
    Import.insert(importDoc);
    oldPurchase.qty += doc.qty;
    oldPurchase.cost = doc.cost;
    oldPurchase.price = doc.price;
    oldPurchase.date = doc.date;
    return Purchase.update({ _id: oldPurchase._id }, { $set: oldPurchase });
  }
}
