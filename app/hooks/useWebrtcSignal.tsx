import {useCallback, useEffect, useMemo, useState} from 'react';
import database from '@react-native-firebase/database';
import {getUniqueId} from 'react-native-device-info';
import {metadata} from "web/src/app/layout";

type Session = {
  offer: string;
  offerFrom: string;
  key: string;
  creator: string;
};
const getDBRef = async () => {
  const creatorId = await getUniqueId();
  return database().ref(`/session/${creatorId}`);
}
export const useWebRTCSignal = () => {
  const [sessions, setSession] = useState<Session[]>([]);

  useEffect(() => {
    ref.on('value', async snapshot => {
      const jsonData = snapshot.toJSON();

      setSession(
        [...(Object.values(jsonData ?? []) as Session[])].filter(
          s => true
        ),
      );
    });

    return () => ref.off('value', () => console.log('Subscriber disconnected'));
  }, []);

  const initiateSession = useCallback(async (offer: string) => {
    const newRef = ref.push();
    newRef
      .set({
        offer,
        key: newRef.key,
      })
      .then(() => console.log('Data set.'))
      .catch(console.error);
  }, []);

  useEffect(() => {
    // console.log('Session updated', sessions);
  }, [sessions]);

  const saveAnswer = useCallback(async (offer: any, answer: string) => {
    const creatorId = await getUniqueId();
    await database()
      .ref(`/session/${creatorId}/${offer.key}`)
      .update({
        answer: JSON.stringify(answer),
      });
  }, []);

  return useMemo(
    () => ({
      initiateSession,
      saveAnswer,
      sessions,
    }),
    [initiateSession, sessions, saveAnswer],
  );
};
