import { z } from "zod";
import { loginSchema } from "./auth.dto";

export type LoginDTO = z.infer<typeof loginSchema>;
