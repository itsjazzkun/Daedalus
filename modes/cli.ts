import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";

export async function runCliMode() {
  while (true) {
    const mode = await select({
      message: "Choose CLI sub-mode:",
      options: [
        { value: "agent", label: "Agent Mode" },
        { value: "plan", label: "Plan Mode" },
        { value: "ask", label: "Ask Mode" },
        { value: "back", label: "Back to Main Menu" },
      ],
    });

    if (isCancel(mode) || mode === "back") {
      return;
    }

    if (mode === "agent") {
      // Agent mode logic
    } else if (mode === "plan") {
      // Plan mode logic
    } else if (mode === "ask") {
      // Ask mode logic
    } else {
      console.log(
        chalk.red("Mode not implemented yet. Please choose another mode.\n"),
      );
    }
  }
}
