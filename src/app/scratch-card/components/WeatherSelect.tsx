import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cloud, CloudSun, Droplets, Sun, Wind } from "lucide-react";
import { useId } from "react";

const WeatherSelect = () => {
  const id = useId();
  return (
    <div className="space-y-2 min-w-[200px] w-full">
      {/* <Label className="text-xs opacity-50" htmlFor={id}>Weather</Label> */}
      <Select defaultValue="1">
        <SelectTrigger
          id={id}
          className="h-auto ps-2 [&>span]:flex [&>span]:flex-start [&>span]:gap-2 [&>span_img]:shrink-0"
        >
          <SelectValue placeholder="Choose weather" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectItem value="1">
            <span className="flex items-center gap-2">
              <Sun size={20} />
              <span>
                <span className="block font-medium text-left">Sunny Weather</span>
                <span
                  className="mt-0.5 block text-xs text-left text-muted-foreground"
                  data-desc
                >
                  Fast outfield
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="2">
            <span className="flex items-center gap-2">
              <CloudSun size={20} />
              <span>
                <span className="block font-medium  text-left">
                  Partly Cloudy Weather
                </span>
                <span
                  className="mt-0.5 block text-xs text-left text-muted-foreground"
                  data-desc
                >
                  Balanced conditions
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="3">
            <span className="flex items-center gap-2">
              <Cloud size={20} />
              <span>
                <span className="block font-medium text-left">Overcast Weather</span>
                <span
                  className="mt-0.5 block text-xs text-left text-muted-foreground"
                  data-desc
                >
                  Favors swing bowling
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="4">
            <span className="flex items-center gap-2">
              <Droplets size={20} />
              <span>
                <span className="block font-medium text-left">Humid Weather</span>
                <span
                  className="mt-0.5 block text-xs text-left text-muted-foreground"
                  data-desc
                >
                  Increased swing
                </span>
              </span>
            </span>
          </SelectItem>
          <SelectItem value="5">
            <span className="flex items-center gap-2">
              <Wind size={20} />
              <span>
                <span className="block font-medium text-left">Windy Weather</span>
                <span
                  className="mt-0.5 block text-xs text-left text-muted-foreground"
                  data-desc
                >
                  Affects ball trajectory
                </span>
              </span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default WeatherSelect;
