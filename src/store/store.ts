import { create, type StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from "zustand/middleware";
/** 필요한 미들웨어 사전에 주입 */
export const createZustandStore = <T extends object>(
  initializer: StateCreator<
    T,
    [["zustand/devtools", never], ["zustand/immer", never]]
  >
) => create<T>()(devtools(immer(initializer)));

export const createSubscribedZustandStore = <T extends object>(
  initializer: StateCreator<
    T,
    [
      ["zustand/devtools", never],
      ["zustand/immer", never],      
    ]
  >
) => create<T>()(subscribeWithSelector(devtools(immer(initializer))));