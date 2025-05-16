"use client";
import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarDate, today } from "@internationalized/date";

export function DateFilter() {
  const [date, setDate] = React.useState<CalendarDate>(today("UTC"));

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Filter by date:</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-fit justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? `${date.day} ${date.month} ${date.year}` : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar value={date} onChange={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
