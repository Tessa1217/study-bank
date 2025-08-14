import { create, type StateCreator } from 'zustand'
import { createJSONStorage, devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from "zustand/middleware";
import { persist } from 'zustand/middleware';

type StateCreatorType<T> = StateCreator<T, [["zustand/devtools", never], ["zustand/immer", never]]>

/** 필요한 미들웨어 사전에 주입 */
export const createZustandStore = <T extends object>(
  storeKey: string, initializer: StateCreatorType<T>
) => create<T>()(persist(devtools(immer(initializer)), { name : storeKey, storage: createJSONStorage(() => sessionStorage)}))

export const createSubscribedZustandStore = <T extends object>(
storeKey: string, initializer: StateCreatorType<T>) => create<T>()(subscribeWithSelector(persist(devtools(immer(initializer)), {name : storeKey, storage: createJSONStorage(() => sessionStorage)})));