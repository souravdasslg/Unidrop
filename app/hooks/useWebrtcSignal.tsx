import {useCallback, useEffect, useMemo, useState} from 'react';
import {useUser, useRealm, useQuery} from '@realm/react';
import {Session} from '../models';
import {BSON} from 'realm';

export const useWebRTCSignal = () => {
  const realm = useRealm();
  const user = useUser();
  const sessions = useQuery(Session, sessions => {
    return sessions.sorted(['createdAt']);
  });

  const initiateSession = useCallback(
    (senderPeerDetails: string) => {
      realm.write(() => {
        realm.create(Session, {
          _id: new BSON.ObjectID(),
          senderId: user.id,
          senderPeerDetails,
        });
      });
    },
    [realm, user.id],
  );

  useEffect(() => {
    sessions.subscribe({name: 'incoming_session'}).catch(console.error);
    realm.subscriptions.findByName('incoming_session');
    return () => sessions.unsubscribe();
  }, []);

  useEffect(() => {
    console.log('Session updated', sessions);
  }, [sessions]);

  return useMemo(
    () => ({
      initiateSession,
      sessions: sessions.filter(session => session.senderId !== user.id),
    }),
    [initiateSession, sessions, user.id],
  );
};
