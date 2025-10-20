export const createQueryKeys = <
   Namespace extends string,
   KeyFactories extends Record<string, ((...args: any[]) => readonly unknown[]) | null>,
>(
   namespace: Namespace,
   keys: KeyFactories,
) => {
   return Object.fromEntries(
      Object.entries(keys).map(([key, value]) => {
         if (value === null) {
            // np. jobRequestKeys.all
            return [key, [namespace, key] as const]
         }

         // np. jobRequestKeys.detail(id)
         return [key, (...args: any[]) => [namespace, key, ...value(...args)] as const]
      }),
   ) as {
      [K in keyof KeyFactories]: KeyFactories[K] extends null
         ? readonly [Namespace, K]
         : (
              ...args: Parameters<NonNullable<KeyFactories[K]>>
           ) => readonly [Namespace, K, ...ReturnType<NonNullable<KeyFactories[K]>>]
   }
}
