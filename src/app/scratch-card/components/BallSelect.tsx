import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Cloud, CloudSun, Droplets, Sun, Volleyball, Wind } from "lucide-react";
import { useId } from "react";

const BallSelect = () => {
  const id = useId();
  return (
    <div className="space-y-2 min-w-[200px] w-full">
      {/* <Label className="text-xs opacity-50" htmlFor={id}>Ball</Label> */}
      <Select defaultValue="1">
        <SelectTrigger
          id={id}
          className="h-auto ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
        >
          <SelectValue placeholder="Choose Ball" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectItem value="1">
            <span className="flex items-center gap-2">
              <Volleyball size={20} />
              <span>
                <span className="block font-medium text-left">
                  Leather Ball
                </span>
                <span
                  className="mt-0.5 block text-xs text-muted-foreground"
                  data-desc
                >
                  Fast outfield
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="2">
            <span className="flex items-center gap-2">
              <Volleyball size={20} />
              <span>
                <span className="block font-medium  text-left">
                  Tennis Ball
                </span>
                <span
                  className="mt-0.5 block text-xs text-muted-foreground"
                  data-desc
                >
                  Balanced conditions
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="3">
            <span className="flex items-center gap-2">
              <Volleyball size={20} />
              <span>
                <span className="block font-medium text-left">Other Ball</span>
                <span
                  className="mt-0.5 block text-xs text-muted-foreground"
                  data-desc
                >
                  Favors swing bowling
                </span>
              </span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BallSelect;
