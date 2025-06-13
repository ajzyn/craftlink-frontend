export const queryKeys = {
  auth: {
    user: ["auth", "user"],
    refresh: ["auth", "refresh"],
  },
  serviceRequest: {
    all: ["requests"],
    detail: (id: string) => ["test", id],
  },
  offers: {
    all: ["offers"],
    detail: (id: string) => ["offers", id],
    byCategory: (category: string) => ["offers", "category", category],
  },
}
