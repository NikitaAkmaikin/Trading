import { z } from 'zod';

export const OrderSchema = z.object({
    id: z.string(),
    route: z.string(),
    date: z.string(),
    passenger: z.string(),
    amount: z.number(),
    status: z.enum(['PAID', 'PENDING', 'CANCELLED']),
});

export const TicketSchema = z.object({
    id: z.coerce.string(),
    from: z.string(),
    to: z.string(),
    transportType: z.enum(['train', 'plane', 'bus']),
    date: z.string(),
    time: z.string(),
    duration: z.string(),
    price: z.number(),
    seatsAvailable: z.number(),
    lowerSeats: z.number(),
    vagonType: z.string(),
    company: z.string(),
});

export const PriceCalendarItemSchema = z.object({
    date: z.string(),
    day: z.string(),
    price: z.number(),
    fullDate: z.string(),
});

export const TicketsDataSchema = z.object({
    routes: z.array(TicketSchema),
    priceCalendar: z.array(PriceCalendarItemSchema),
});

export type Order = z.infer<typeof OrderSchema>;
export type Ticket = z.infer<typeof TicketSchema>;
export type PriceCalendarItem = z.infer<typeof PriceCalendarItemSchema>;
export type TicketsData = z.infer<typeof TicketsDataSchema>;
