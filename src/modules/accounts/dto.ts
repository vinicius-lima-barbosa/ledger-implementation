import z from "zod";

export const createAccountsDto = z.object({
  id: z.uuidv4().optional(),
  name: z.string().optional(),
  direction: z.enum(["debit", "credit"]),
});

export const accountResponse = z.object({
  id: z.uuidv4(),
  name: z.string(),
  direction: z.enum(["debit", "credit"]),
  balance: z.number(),
});

export type TCreateAccounts = z.infer<typeof createAccountsDto>;
export type TAccountResponse = z.infer<typeof accountResponse>;
