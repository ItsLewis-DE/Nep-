import type { CommandDef } from '../../command.ts';

export * from './wallet-commands.ts';

import { shopBuyCommand, walletGrantCommand } from './wallet-commands.ts';

export const allWalletCommands: CommandDef<any>[] = [
  shopBuyCommand,
  walletGrantCommand
];
