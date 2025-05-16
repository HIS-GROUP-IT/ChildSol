"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Calendar } from "@/components/ui/calendar";
import { parseDate, CalendarDate } from "@internationalized/date";


type ThemeProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  onCreateTheme?: (theme: {
    name: string;
    dates: Date[];
    color: string;
  }) => void;
  editTheme?: { id: string; name: string; dates: Date[]; color: string } | null;
};

// Helper function to convert CalendarDate to JavaScript Date
function calendarDateToDate(calendarDate: CalendarDate): Date {
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
}

export default function ThemeModal({
  showModal,
  setShowModal,
  onCreateTheme,
  editTheme = null,
}: ThemeProps) {
  const [selectedDates, setSelectedDates] = React.useState<CalendarDate[]>([]);
  const [name, setName] = React.useState("");
  const [color, setColor] = React.useState("#F7A400");
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  React.useEffect(() => {
    if (editTheme) {
      setName(editTheme.name);
      setSelectedDates(
        editTheme.dates.map((date) =>
          parseDate(date.toISOString().split("T")[0])
        )
      );
      setColor(editTheme.color);
    } else {
      setName("");
      setSelectedDates([]);
      setColor("#F7A400");
    }
  }, [editTheme, showModal]);

  const handleSubmit = () => {
    if (name.trim() === "" || selectedDates.length === 0) {
      return;
    }

    if (onCreateTheme) {
      onCreateTheme({
        name,
        dates: selectedDates.map(calendarDateToDate),
        color,
      });
    }

    setShowModal(false);
  };

  const handleDateChange = (
    dates: CalendarDate | CalendarDate[] | undefined
  ) => {
    if (dates) {
      setSelectedDates(Array.isArray(dates) ? dates : [dates]);
    } else {
      setSelectedDates([]);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
      <DialogContent className="sm:max-w-[450px] rounded-2xl px-6 py-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {editTheme ? "Edit Theme" : "Create a Theme"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Name of theme
            </label>
            <Input
              placeholder="Enter the name of theme"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Theme Color
            </label>
            <div className="flex items-center space-x-2">
              <div
                className="w-10 h-10 rounded-md cursor-pointer border border-gray-200"
                style={{ backgroundColor: color }}
                onClick={() => setShowColorPicker(!showColorPicker)}
              />
              <span className="text-sm text-gray-500">{color}</span>
            </div>
          </div>

          <div className="space-y-1 w-full">
            <label className="text-sm font-medium text-gray-700">
              Select dates
            </label>
            <Calendar
              value={selectedDates[0]} // Only support single date selection
              onChange={(date) => handleDateChange(date)}
              className="rounded-4xl mx-auto flex justify-center w-full border"
            />

            <div className="mt-1 text-gray-500">
              {selectedDates.length > 0 && (
                <p>
                  Selected: {selectedDates.length} day(s) from{" "}
                  {calendarDateToDate(selectedDates[0]).toLocaleDateString()} to{" "}
                  {calendarDateToDate(
                    selectedDates[selectedDates.length - 1]
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            className="w-full rounded-4xl shadow-xl text-white hover:opacity-90"
            style={{ backgroundColor: color }}
            onClick={handleSubmit}
          >
            {editTheme ? "Update Theme" : "Create Theme"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
