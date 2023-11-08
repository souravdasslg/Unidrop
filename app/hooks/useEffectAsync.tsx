import {useEffect, useCallback} from 'react';

type EffectFunction = () => void | (() => void | Promise<void>);

export function useEffectAsync(effect: EffectFunction, inputs?: any[]) {
  const effectCallback = useCallback(effect, [effect, inputs]);

  useEffect(() => {
    let mounted = true;

    const maybePromise = effectCallback();

    Promise.resolve(maybePromise).then(() => {
      if (mounted) {
        effectCallback();
      }
    });

    return () => {
      mounted = false;
    };
  }, [effectCallback]);
}
