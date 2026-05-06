import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ZodSchema } from "zod";

function buildValidationErrorResponse(
  issues: Array<{ path: PropertyKey[]; message: string }>,
) {
  return {
    error: "Validation failed",
    details: issues.map((issue) => ({
      path: issue.path.map(String).join("."),
      message: issue.message,
    })),
  };
}

export function schemaValidation<T>(schema: ZodSchema<T>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json(buildValidationErrorResponse(result.error.issues));
    }

    req.validatedBody = result.data;
    next();
  };
}
