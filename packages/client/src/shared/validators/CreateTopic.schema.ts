import { z } from 'zod';

export const CreateTopicSchema = z.object({
    title: z.string({ required_error: 'Required field' }).min(1),
    text: z.string({ required_error: 'Required Field' }).max(99).min(1),
});
