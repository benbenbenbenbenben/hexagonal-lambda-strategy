// this is a cold start service, resolve stuff that relies on environment variable input here
export const WidgetService = {
  getWidgets: async (userId: string) => [{ id: "w1" }, { id: "w2" }],
};
