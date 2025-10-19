import {
   type MutationFunction,
   type QueryClient,
   useMutation,
   type UseMutationOptions,
   useQueryClient,
} from "@tanstack/react-query"
import type { ApiError } from "@/shared/api/api-types"

export interface BaseMutationOptions<TData, TVariables>
   extends Omit<UseMutationOptions<TData, ApiError, TVariables>, "mutationFn"> {
   invalidateKeys?: string[][]
   onCacheUpdate?: (
      queryClient: QueryClient,
      data: TData,
      variables: TVariables,
   ) => void | Promise<void>
}

export const useBaseMutation = <TData = void, TVariables = void>(
   mutationFn: MutationFunction<TData, TVariables>,
   { invalidateKeys, onCacheUpdate, ...rest }: BaseMutationOptions<TData, TVariables> = {},
) => {
   const queryClient = useQueryClient()

   return useMutation<TData, ApiError, TVariables>({
      mutationFn,
      ...rest,
      onSuccess: async (data, variables, context) => {
         if (onCacheUpdate) {
            await onCacheUpdate(queryClient, data, variables)
         }

         if (invalidateKeys?.length) {
            await Promise.all(
               invalidateKeys.map(key => queryClient.invalidateQueries({ queryKey: key })),
            )
         }

         rest.onSuccess?.(data, variables, context)
      },

      onError: (error, variables, context) => {
         console.error("Mutation error:", error)
         rest.onError?.(error, variables, context)
      },
   })
}
