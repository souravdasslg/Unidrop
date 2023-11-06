import {useCallback, useEffect, useMemo} from 'react';
import {useUser, useRealm, useQuery} from '@realm/react';
import {Session} from '../models';

export const useWebRTCSignal = () => {
  const realm = useRealm();
  const user = useUser();
  const sessions = useQuery(Session, collection =>
    collection.filtered(`senderId !== ${user.id}`),
  );

  const initiateSession = useCallback(
    (senderPeerDetails: string) => {
      realm.write(() => {
        return realm.create(Session, {
          senderId: user.id,
          senderPeerDetails,
        });
      });
    },
    [realm, user.id],
  );
  useEffect(() => {
    const createSessionSubscription = async () => {
      await sessions.subscribe({name: 'incoming_session'});
    };
    createSessionSubscription().catch(console.error);
    realm.subscriptions.findByName('incoming_session')
  }, [realm.subscriptions, sessions]);

  return useMemo(
    () => ({
      initiateSession,
    }),
    [initiateSession],
  );
};
