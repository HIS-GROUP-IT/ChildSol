"use client";

import { useCalendar } from "@react-aria/calendar";
import { useCalendarState } from "@react-stately/calendar";
import { useLocale } from "@react-aria/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";
import { createCalendar } from "@internationalized/date";
import type { CalendarDate } from "@internationalized/date";

interface CalendarProps {
  value?: CalendarDate;
  onChange?: (value: CalendarDate) => void;
  className?: string;
}

export function Calendar(props: CalendarProps) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state
  );

  // Get the dates for the current month view
  const { start, end } = state.visibleRange;
  const dates: CalendarDate[] = [];
  let date = start;
  while (date.compare(end) <= 0) {
    dates.push(date);
    date = date.add({ days: 1 });
  }

  return (
    <div {...calendarProps} ref={ref} className={cn("p-3 rounded-md border", props.className)}>
      <div className="flex items-center justify-between pb-4">
        <button
          {...prevButtonProps}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          {state.visibleRange.start.month} {state.visibleRange.start.year}
        </span>
        <button
          {...nextButtonProps}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-muted-foreground rounded-md w-8 text-center text-xs font-normal"
          >
            {day}
          </div>
        ))}
        {dates.map((date, i) => {
          const isSelected = state.isSelected(date);
          const isDisabled = state.isCellDisabled(date);
          return (
            <button
              key={i}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-8 w-8 p-0 font-normal",
                isSelected && "bg-primary text-primary-foreground",
                isDisabled && "text-muted-foreground opacity-50"
              )}
              disabled={isDisabled}
              onClick={() => state.selectDate(date)}
            >
              {date.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
