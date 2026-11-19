import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";

const BANNER_FONT = "cybermedium";
const SHADOW = chalk.hex("#850fe6");
const FACE = chalk.hex("#f5f5f5").bold;

const CYBER_YELLOW = chalk.hex("#FCEE0A").bold; // Cyberpunk Logo Yellow
const DANTE_CRIMSON = chalk.hex("#D70F23").bold; // Dante Coat Red
const VERGIL_CYAN = chalk.hex("#00E1FF"); // Yamato / Cyberpunk Cyan
const DT_NEON = chalk.hex("#FF2D55").bold; // Devil Trigger Neon Edge
const DARK_METAL = chalk.hex("#555A69");

function printBannerWithShadow(ascii: string) {
  const CYBER_YELLOW = chalk.hex("#FCEE0A").bold;
  const CYBER_CYAN = chalk.hex("#00F0FF");
  const CYBER_RED = chalk.hex("#FF003C");
  const DARK_SLATE = chalk.hex("#4B5263");

  const bannerLines = ascii.replace(/\s+$/, "").split("\n");
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
  const innerWidth = maxLen + 5;

  console.log("");
  console.log(
    DARK_SLATE("  [BIOS v2.077] ") +
      CYBER_CYAN("NEURAL_LINK: ") +
      CYBER_YELLOW("CONNECTED") +
      DARK_SLATE(" // ") +
      CYBER_RED("SAMURAI_KERNEL_INIT"),
  );

  const topLabel = " // NETWATCH_OS v2.077 [BREACH_PROTOCOL] ";
  const topFill = Math.max(0, innerWidth - topLabel.length);

  console.log(
    "  " +
      CYBER_CYAN("◢") +
      CYBER_YELLOW("▀".repeat(innerWidth)) +
      CYBER_RED("◣"),
  );
  console.log(
    " " +
      CYBER_CYAN("┃") +
      CYBER_RED(topLabel) +
      DARK_SLATE("─".repeat(topFill)) +
      CYBER_CYAN("┓"),
  );

  bannerLines.forEach((line, rowIndex) => {
    const prevLine = bannerLines[rowIndex - 1] || "";
    const curr = line.padEnd(maxLen, " ");
    const prev = prevLine.padEnd(maxLen, " ");

    let renderedRow = "  ";

    for (let col = 0; col <= maxLen; col++) {
      const char = curr[col] || " ";
      const shadowSource = col > 0 ? prev[col - 1] : " ";

      if (char !== " ") {
        renderedRow += CYBER_YELLOW(char);
      } else if (shadowSource && shadowSource !== " ") {
        renderedRow += CYBER_CYAN("░");
      } else {
        renderedRow += " ";
      }
    }

    renderedRow += "  ";
    console.log(" " + CYBER_CYAN("┃") + renderedRow + CYBER_RED("┃"));
  });

  const botLabel = " [ ICE: BYPASSED // NIGHT_CITY ] ";
  const botFill = Math.max(0, innerWidth - botLabel.length);

  console.log(
    " " +
      CYBER_RED("┗") +
      DARK_SLATE("─".repeat(botFill)) +
      CYBER_CYAN(botLabel) +
      CYBER_RED("┃"),
  );
  console.log(
    "  " +
      CYBER_RED("◥") +
      CYBER_YELLOW("▄".repeat(innerWidth)) +
      CYBER_CYAN("◤"),
  );

  console.log(
    DARK_SLATE(
      `  > DAEMON_LOADED // SUBNET: 10.77.20.77 // STATUS: ${CYBER_YELLOW("READY")}\n`,
    ),
  );
}

export async function runWakeup() {
  let ascii: string;
  try {
    ascii = figlet.textSync("Daedalus", { font: BANNER_FONT });
  } catch (error) {
    ascii = figlet.textSync("Daedalus", { font: "Standard" });
  }
  printBannerWithShadow(ascii);

  const mode = await select({
    message: "Which mode would you want to run Daedalus in?",
    options: [
      { value: "cli", label: "Command Line Interface (CLI) Mode" },
      { value: "telegram", label: "Telegram Bot Mode" },
      { value: "exit", label: "Exit Daedalus" },
    ],
  });

  if (isCancel(mode) || mode === "exit") {
    console.log(chalk.italic("Operation cancelled."));
    return;
  }

  if (mode === "cli") {
    console.log(chalk.italic("Starting Daedalus in CLI mode..."));
    await runCliMode();
  } else if (mode === "telegram") {
    console.log(chalk.italic("Starting Daedalus in Telegram Bot mode..."));
  }
}