import { UserService } from "../services/userService";
import { WidgetService } from "../services/widgetService";

// your actual lambda implementation
export default async (
    $getWidgets = WidgetService.getWidgets, // <- these are cold start dependencies
    $getThisUser = UserService.getThisUser // <-
  ) =>
  async (
    $thisUser = $getThisUser() // <- this is a per call dependency
  ) => {
    const { id, name } = await $thisUser;
    const { length: widgetCount } = await $getWidgets(id);
    return `Hello ${name}. You have ${widgetCount} widgets.`;
  };
