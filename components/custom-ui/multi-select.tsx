"use client";

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  menus: TMenu[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  menus,
  value,
  onChange,
  onRemove,
}) => {
  const [ inputValue, setInputValue ] = useState("");
  const [ open, setOpen ] = useState(false);

  let selected: TMenu[];
  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      menus.find((menu) => menu?._id === id)
    ) as TMenu[];
  }

  const selectables = menus.filter((menu) => !selected.includes(menu));

  return (
    <Command>
      <div className="flex gap-1 flex-wrap">
        {selected.map((menu) => (
          <Badge key={menu._id} className="bg-gray-400">
            {menu.title}
            <button type="button" className="ml-1 hover:text-red-500" onClick={() => onRemove(menu._id)}>
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <CommandInput className="w-full"
        placeholder={placeholder}
        value={inputValue}
        onValueChange={setInputValue}
        onBlur={() => setOpen(false)}
        onFocus={() => setOpen(true)}
      />
      <CommandList>
        {open && (
          <CommandGroup className="border rounded-md shadow-md">
            {selectables.map((menu) => (
              <CommandItem
                key={menu._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(menu._id);
                  setInputValue("");
                }}
                className="cursor-pointer"
              >{menu.title}</CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export default MultiSelect;