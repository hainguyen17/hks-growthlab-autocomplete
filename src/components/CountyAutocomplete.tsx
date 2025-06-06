import { useState } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { getGroupedData, processData } from "../utils/processData";
import type { Entity } from "../types/Entity";

export type FieldState = {
    selectedKey: React.Key | null;
    inputValue: string;
    items: Record<number, Record<number, Entity[]>>;
};

export function CountyAutocomplete() {
    const [fieldState, setFieldState] = useState<FieldState>({
        selectedKey: "",
        inputValue: "",
        items: processData(),
    });
    const { statesMetadata, regionsMetadata, countiesMetadata } =
        getGroupedData();

    const onInputChange = (value: string) => {
        setFieldState((prevState) => ({
            inputValue: value,
            selectedKey: prevState.selectedKey,
            items: processData(value),
        }));
    };

    const onSelectionChange = (key: React.Key | null) => {
        setFieldState(() => {
            const countyName = countiesMetadata[key as any]?.name || undefined;
            console.log(countyName);
            return {
                inputValue: countyName || "",
                selectedKey: key,
                items: processData(countyName),
            };
        });
    };

    const onOpenChange = (isOpen: boolean) => {
        if (isOpen && fieldState.selectedKey) {
            const selectedItem = document.querySelectorAll(
                `#county${fieldState.selectedKey}`
            );
            selectedItem[0]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };
    return (
        <Autocomplete
            className="w-[500px]"
            classNames={{
                // listbox: "h-[512px]",
                // listboxWrapper: "h-[512px]",
                // popoverContent: "h-[512px] w-[500px]",
                popoverContent: "w-[500px]",
            }}
            inputValue={fieldState.inputValue}
            onInputChange={onInputChange}
            onSelectionChange={onSelectionChange}
            onOpenChange={onOpenChange}
            selectedKey={fieldState.selectedKey as number}
            items={fieldState.items as any}
            placeholder="Please select a county"
            disabledKeys={[
                ...Object.keys(statesMetadata),
                ...Object.keys(regionsMetadata),
            ]}
            listboxProps={{
                itemClasses: {
                    base: ["data-[hover=true]:bg-[#E8F1F7]"],
                },
            }}
        >
            {Object.entries(fieldState.items).map(([regionId, states]: any) => (
                <>
                    <AutocompleteItem key={regionId}>
                        {regionsMetadata[regionId].name}
                    </AutocompleteItem>
                    {Object.entries(states).map(([stateId, counties]: any) => (
                        <>
                            <AutocompleteItem key={stateId}>
                                <div className="ps-[20px]">
                                    {statesMetadata[stateId].name}
                                </div>
                            </AutocompleteItem>
                            {counties.map((county: Entity) => (
                                <AutocompleteItem
                                    id={"county" + county.id}
                                    key={county.id}
                                >
                                    <div className="ps-[40px]">
                                        {county.name}
                                    </div>
                                </AutocompleteItem>
                            ))}
                        </>
                    ))}
                </>
            ))}
        </Autocomplete>
    );
}
