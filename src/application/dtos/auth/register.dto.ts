import { z } from "zod";
import { registerSchema } from "./auth.dto";

export type RegisterDTO = z.infer<typeof registerSchema>;
