// this is a per call service, resolve stuff that relies on execution context here (e.g. headers, auth etc)
export type User = {
  id: string
  name: string
}

export const UserService = {
  getThisUser: async (): Promise<User> => ({ id: "1", name: "Bob" }),
};
