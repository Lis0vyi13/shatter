import { useState, useEffect, SetStateAction, Dispatch } from "react";
import Picker from "react-mobile-picker";

import { cn, getDaysInMonth } from "@/utils";

export interface SelectedDate {
  day: string;
  month: string;
  year: string;
}

interface BirthdayPickerProps {
  className?: string;
  value: SelectedDate | null;
  onChange: Dispatch<SetStateAction<SelectedDate | null>>;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BirthdayPicker = ({
  className,
  value,
  onChange,
}: BirthdayPickerProps) => {
  const [days, setDays] = useState<string[]>([]);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString(),
  );

  const COLUMNS = [
    { name: "day", data: days },
    { name: "month", data: months },
    { name: "year", data: years },
  ];

  useEffect(() => {
    const monthIndex = months.indexOf(value?.month || "January") + 1;
    const year = parseInt(value?.year || "2025", 10);
    const daysInMonth = getDaysInMonth(monthIndex, year);
    const newDays = Array.from({ length: daysInMonth }, (_, i) =>
      (i + 1).toString(),
    );

    setDays(newDays);

    if (!newDays.includes(value?.day || "1")) {
      onChange((prev) =>
        prev ? { ...prev, day: newDays[newDays.length - 1] } : null,
      );
    }
  }, [onChange, value, value?.day, value?.month, value?.year]);

  return (
    <Picker
      wheelMode="normal"
      value={{
        day: value?.day || "1",
        month: value?.month || "January",
        year: value?.year || "2025",
      }}
      onChange={onChange}
      className={cn("text-[14px]", className)}
    >
      {COLUMNS.map((col) => (
        <Picker.Column key={col.name} name={col.name}>
          {col.data.map((day) => (
            <Picker.Item className="cursor-pointer" key={day} value={day}>
              {day}
            </Picker.Item>
          ))}
        </Picker.Column>
      ))}
    </Picker>
  );
};

export default BirthdayPicker;
