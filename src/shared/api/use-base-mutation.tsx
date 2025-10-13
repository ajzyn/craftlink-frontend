import {
   type MutationFunction,
   useMutation,
   type UseMutationOptions,
   useQueryClient,
} from "@tanstack/react-query"

type BaseMutationOptions<TData, TVariables> = {
   invalidateKeys?: string[][]
} & Omit<UseMutationOptions<TData, unknown, TVariables>, "mutationFn">

export const useBaseMutation = <TData, TVariables>(
   mutationFn: MutationFunction<TData, TVariables>,
   { invalidateKeys, ...rest }: BaseMutationOptions<TData, TVariables> = {},
) => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn,
      ...rest,
      onSuccess: async () => {
         if (invalidateKeys?.length) {
            await Promise.all(
               invalidateKeys.map(key => queryClient.invalidateQueries({ queryKey: key })),
            )
         }
      },
   })
}
