import {Mongo} from 'meteor/mongo'

export const Customer=new Mongo.Collection('customers')
export const Category=new Mongo.Collection('categories')