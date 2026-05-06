import z from "zod";

const entryDto = z.object({
  accountId: z.string(),
  amount: z.number(),
  direction: z.enum(["debit", "credit"]),
});

export const createTransactionDto = z.object({
  id: z.uuidv4().optional(),
  name: z.string().optional(),
  entries: z.array(entryDto),
});

export type TCreateTransaction = z.infer<typeof createTransactionDto>;
