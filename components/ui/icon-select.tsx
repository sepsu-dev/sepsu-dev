import React, { useState, useEffect, useRef, useMemo } from "react";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { BRAND_ICON_MAP } from "@/components/ui/icon";
import { ChevronDown, Search, X } from "lucide-react";

interface IconSelectProps {
  value: string;
  onChange: (value: string) => void;
  type: "lucide" | "brand";
  placeholder?: string;
  id?: string;
}

export function IconSelect({
  value,
  onChange,
  type,
  placeholder = "Select or search icon...",
  id,
}: IconSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize search input with selected value or empty
  useEffect(() => {
    setSearch(value);
  }, [value]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch(value); // Reset search to match selected value
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  // Get full list of options based on type
  const allOptions = useMemo(() => {
    if (type === "lucide") {
      // Return list of Lucide icons in TitleCase or original name
      // dynamicIconImports keys are kebab-case
      return Object.keys(dynamicIconImports).map((key) => {
        // Convert kebab-case to TitleCase for nice display (e.g. arrow-up-right -> ArrowUpRight)
        const titleCase = key
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("");
        return {
          value: titleCase,
          label: titleCase,
          slug: key,
        };
      });
    } else {
      // Brand type: return keys of BRAND_ICON_MAP
      return Object.keys(BRAND_ICON_MAP).map((key) => {
        const info = BRAND_ICON_MAP[key];
        // Capitalize for display
        const displayLabel = key.charAt(0).toUpperCase() + key.slice(1);
        return {
          value: key,
          label: displayLabel,
          slug: info.slug,
        };
      });
    }
  }, [type]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return allOptions.slice(0, 100); // Limit initial view to 100 items

    const filtered = allOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.value.toLowerCase().includes(query) ||
        opt.slug.toLowerCase().includes(query)
    );

    // If query is not in the list, allow custom values (e.g. image URLs or new slugs)
    const exactMatch = filtered.some(
      (opt) => opt.value.toLowerCase() === query
    );
    if (!exactMatch && query.length > 0) {
      filtered.unshift({
        value: search,
        label: `Use "${search}"`,
        slug: search,
      });
    }

    return filtered.slice(0, 100); // Limit to keep performance fast
  }, [allOptions, search]);

  // Reset active index when filtered options change
  useEffect(() => {
    setActiveIndex(0);
  }, [filteredOptions]);

  // Scroll active item into view
  useEffect(() => {
    if (isOpen && listRef.current) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        const listEl = listRef.current;
        const activeTop = activeEl.offsetTop;
        const activeBottom = activeTop + activeEl.offsetHeight;
        const listScrollTop = listEl.scrollTop;
        const listHeight = listEl.offsetHeight;

        if (activeBottom > listScrollTop + listHeight) {
          listEl.scrollTop = activeBottom - listHeight;
        } else if (activeTop < listScrollTop) {
          listEl.scrollTop = activeTop;
        }
      }
    }
  }, [activeIndex, isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setSearch(val);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        setActiveIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        e.preventDefault();
        break;
      case "ArrowUp":
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
        e.preventDefault();
        break;
      case "Enter":
        if (filteredOptions[activeIndex]) {
          handleSelect(filteredOptions[activeIndex].value);
        }
        e.preventDefault();
        break;
      case "Escape":
        setIsOpen(false);
        setSearch(value);
        e.preventDefault();
        break;
      case "Tab":
        setIsOpen(false);
        setSearch(value);
        break;
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative flex items-center">
        {/* Leading preview icon */}
        {value && (
          <div className="absolute left-3 z-10 flex items-center justify-center pointer-events-none">
            <Icon name={value} size={18} className="text-foreground" />
          </div>
        )}

        <Input
          id={id}
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={`w-full ${value ? "pl-10" : "pl-3"} pr-10`}
          autoComplete="off"
        />

        {/* Clear / Open indicator buttons */}
        <div className="absolute right-2 flex items-center gap-1">
          {search && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setSearch("");
                setIsOpen(true);
              }}
              className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Dropdown Options List */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-popover text-popover-foreground shadow-lg outline-hidden animate-in fade-in-0 zoom-in-95 duration-100">
          <div
            ref={listRef}
            className="max-h-60 overflow-y-auto p-1 flex flex-col gap-0.5"
          >
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Tidak ada hasil ditemukan.
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = value.toLowerCase() === option.value.toLowerCase();
                const isActive = index === activeIndex;

                return (
                  <button
                    key={`${option.value}-${index}`}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={`relative w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md text-left transition-colors cursor-pointer select-none ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-medium"
                        : isActive
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent/50 text-foreground"
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                        isSelected
                          ? "bg-primary-foreground/10 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon
                        name={option.value}
                        size={16}
                        className="transition-colors"
                        color={isSelected ? "#ffffff" : undefined}
                      />
                    </div>
                    <span className="truncate flex-1">{option.label}</span>
                    {option.slug && option.slug !== option.value && (
                      <span
                        className={`text-[10px] font-mono font-medium opacity-60 ${
                          isSelected ? "text-primary-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {option.slug}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
