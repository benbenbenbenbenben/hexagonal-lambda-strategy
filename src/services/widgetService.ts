// this is a cold start service, resolve stuff that relies on environment variable input here
export type Widget = {
  id: string
};

export const WidgetService = {
  getWidgets: async (userId: string): Promise<Widget[]> => [{ id: "w1" }, { id: "w2" }],
};
