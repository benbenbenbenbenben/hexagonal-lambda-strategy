// this is a per call service, resolve stuff that relies on execution context here (e.g. headers, auth etc)
export const UserService = {
  getThisUser: async () => ({ id: "1", name: "Bob" }),
};
