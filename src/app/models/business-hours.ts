export interface BusinessHours {
  is_open_now: boolean;
  hours_type: string;
  open: {
    date?: string;
    day?: number;
    start: string;
    end: string;
    is_closed?: boolean;
    is_overnight: boolean;
  };
}
