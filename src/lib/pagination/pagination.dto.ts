import { z } from "zod";

export const PageRequestDto = z.object({
  page: z.coerce.number().int().min(0).default(0),
  size: z.coerce.number().int().min(1).max(100).default(20),
});

export type PageRequestDto = z.infer<typeof PageRequestDto>;

export interface PageResponseDto<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const toPageResponseDto = <T>(
  content: T[],
  { page, size }: PageRequestDto,
  totalElements: number
): PageResponseDto<T> => ({
  content,
  page: {
    number: page,
    size,
    totalElements,
    totalPages: Math.ceil(totalElements / size),
  },
});
