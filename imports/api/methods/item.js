import { Category, Item } from "../collections/collections";
import { Meteor } from "meteor/meteor";
Meteor.methods({
    'item.insert'(doc){
        return Item.insert(doc)
    },
    'item.find'(){
        let data=[]
        Item.find().forEach((it)=>{
            it.categoryName=Category.findOne({_id:it.categoryId}).name
            data.push(it)
        })
        return data
    },
    'item.update'(doc){
        return Item.update({_id:doc._id},{$set:doc})
    },
    'item.remove'(id){
        return Item.remove({_id:id})
    }
})