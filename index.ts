#!/usr/bin/env bun
import { Command } from "commander";
import { runWakeup } from "./tui/wakeup";
const program = new Command();
program.name("daedalus").description("A local AI assistant").version("0.0.1");

program
  .command("wakeup")
  .description("Choose Mode - CLI or Telegram")
  .action(async () => {
    await runWakeup();
  });

await program.parseAsync(process.argv);
