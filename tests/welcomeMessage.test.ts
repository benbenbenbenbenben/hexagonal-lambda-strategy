import welcomeMessageInit from "../src/functions/welcomeMessage";
import type { UserService } from "../src/services/userService";
import type { WidgetService } from "../src/services/widgetService";
import { NotAuthenticatedError } from "../src/errors/NotAuthenticatedError";

test("throws when there is no user - with cold start injection", async () => {
  const pretendWidgetService: typeof WidgetService = {
    getWidgets: async () => [{ id: "w1" }],
  };
  const pretendUserService: typeof UserService = {
    getThisUser: async () => {
      throw new NotAuthenticatedError("A user is not authenticated.");
    },
  };

  const welcomeMessageWithPretendServices = await welcomeMessageInit(
    pretendWidgetService.getWidgets,
    pretendUserService.getThisUser
  );

  const failingPromise = welcomeMessageWithPretendServices();
  await expect(failingPromise).rejects.toHaveProperty("constructor.name", "NotAuthenticatedError")
});