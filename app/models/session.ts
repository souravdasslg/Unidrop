import {Realm} from '@realm/react';
import {ObjectSchema, BSON} from 'realm';
export class Session extends Realm.Object<Session> {
  _id!: BSON.ObjectId;
  senderId!: string;
  senderPeerDetails!: string;

  static schema: ObjectSchema = {
    name: 'Session',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      senderId: {type: 'string'},
      senderPeerDetails: {type: 'string'},
    },
  };
}
