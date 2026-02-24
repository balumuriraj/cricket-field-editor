import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Droplets, RectangleHorizontal, Sprout, Sun, Waves } from "lucide-react";
import { useId } from "react";

const PitchConditionSelect = () => {
  const id = useId();
  return (
    <div className="space-y-2 min-w-[200px] w-full">
      {/* <Label className="text-xs opacity-50" htmlFor={id}>Pitch</Label> */}
      <Select defaultValue="1">
        <SelectTrigger
          id={id}
          className="h-auto ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
        >
          <SelectValue placeholder="Choose pitch condition" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectItem value="1">
            <span className="flex items-center gap-2">
              <Waves size={20} />
              <span>
                <span className="block font-medium text-left">Dry Pitch</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Favors spin bowling
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="2">
            <span className="flex items-center gap-2">
              <Sprout size={20} />
              <span>
                <span className="block font-medium  text-left">Green Pitch</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Assists pace and swing bowling
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="3">
            <span className="flex items-center gap-2">
              <RectangleHorizontal size={20} />
              <span>
                <span className="block font-medium text-left">Flat Pitch</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Batting-friendly conditions
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="4">
            <span className="flex items-center gap-2">
              <Droplets size={20} />
              <span>
                <span className="block font-medium text-left">Damp Pitch</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  Slow, reduced bounce
                </span>
              </span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PitchConditionSelect;
