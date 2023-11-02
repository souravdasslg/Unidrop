import BSON, {Realm} from '@realm/react';

class Signal extends Realm.Object<Signal> {
  _id!: Realm.BSON.ObjectId;
  createDate?: Date;

  static schema: Realm.ObjectSchema = {
    name: 'SharedDocument',
    properties: {
      _id: 'objectId',
      createdDate: 'date',
    },
    primaryKey: '_id',
  };
}
