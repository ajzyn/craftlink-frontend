import {
   type MutationFunction,
   type QueryClient,
   type QueryKey,
   useMutation,
   type UseMutationOptions,
   useQueryClient,
} from "@tanstack/react-query"
import type { ApiError } from "@/shared/api/api-types"

const hasRollback = (context: unknown): context is { rollback: VoidFunction } => {
   return (
      typeof context === "object" &&
      context !== null &&
      "rollback" in context &&
      typeof context.rollback === "function"
   )
}

export interface BaseMutationOptions<
   TData,
   TVariables,
   TCache extends object = Record<string, unknown>,
> extends Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn"> {
   invalidateKeys?:
      | readonly (readonly unknown[])[]
      | ((variables: TVariables) => readonly (readonly unknown[])[])
   onOptimisticUpdate?: (
      queryClient: QueryClient,
      variables: TVariables,
   ) => void | { rollback?: VoidFunction } | Promise<void | { rollback?: VoidFunction }>
   onCacheUpdate?: {
      key: (variables: TVariables, data: TData) => QueryKey
      update: (prev: TCache, data: TData, variables: TVariables) => TCache
   }
}

export const useBaseMutation = <
   TData = void,
   TVariables = void,
   TCache extends object = Record<string, unknown>,
>(
   mutationFn: MutationFunction<TData, TVariables>,
   {
      invalidateKeys,
      onOptimisticUpdate,
      onCacheUpdate,
      ...rest
   }: BaseMutationOptions<TData, TVariables, TCache> = {},
) => {
   const queryClient = useQueryClient()

   return useMutation<TData, ApiError, TVariables>({
      mutationFn,
      ...rest,

      onMutate: async variables => {
         if (onOptimisticUpdate) {
            await queryClient.cancelQueries()
            return onOptimisticUpdate(queryClient, variables)
         }
         return undefined
      },

      onError: (error, variables, context) => {
         if (hasRollback(context)) {
            context.rollback()
         }
         console.error("Mutation error:", error)
         rest.onError?.(error, variables, context)
      },

      onSuccess: async (data, variables, context) => {
         if (onCacheUpdate) {
            const key = onCacheUpdate.key(variables, data)
            queryClient.setQueryData<TCache>(key, prev => {
               if (!prev) return prev
               return onCacheUpdate.update(prev, data, variables)
            })
         }

         const keys =
            typeof invalidateKeys === "function" ? invalidateKeys(variables) : invalidateKeys

         if (keys?.length) {
            await Promise.all(keys.map(key => queryClient.invalidateQueries({ queryKey: key })))
         }

         rest.onSuccess?.(data, variables, context)
      },
   })
}
