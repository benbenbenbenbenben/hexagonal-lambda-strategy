import { UserService } from "../services/userService";
import { WidgetService } from "../services/widgetService";

/**
 * A function that produces a function that produces a message for the current user
 */
export default async (
    $getWidgets = WidgetService.getWidgets,
    $getThisUser = UserService.getThisUser,
  ) =>
  async (
    $thisUser = $getThisUser(),
  ) => {
    const { id, name } = await $thisUser;
    const { length: widgetCount } = await $getWidgets(id);
    return `Hello ${name}. You have ${widgetCount} widgets.`;
  };
