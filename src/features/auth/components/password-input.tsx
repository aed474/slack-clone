"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<
    React.ComponentProps<typeof Input>,
    "type"
>;

export function PasswordInput({
                                  className,
                                  disabled,
                                  ...props
                              }: PasswordInputProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative">
            <Input
                {...props}
                type={isVisible ? "text" : "password"}
                disabled={disabled}
                className={cn("pr-10", className)}
            />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={disabled}
                onClick={() => setIsVisible((current) => !current)}
                className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-muted-foreground hover:bg-transparent"
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
            >
                {isVisible ? (
                    <EyeOff className="size-4" />
                ) : (
                    <Eye className="size-4" />
                )}
            </Button>
        </div>
    );
}