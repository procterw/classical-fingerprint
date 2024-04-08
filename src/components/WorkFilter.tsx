import { Autocomplete, TextField } from "@mui/material";
import { useMusicData } from "../state/useMusicData";
import { Filter, useWorkQueue } from "../state/useWorkQueue";
import { useWidth } from "../state/useWidth";

const uniq = (arr: Array<any>): Array<any> => {
  const nextArr: Array<any> = [];

  arr.forEach((v) => {
    if (nextArr.includes(v)) return;
    nextArr.push(v);
  });

  return nextArr;
};

export const WorkFilter = () => {
  const mq = useWidth();
  const { filter, setFilter } = useWorkQueue();
  const musicData = useMusicData();

  const composers = musicData.composers.map(c => c.name);
  const epochs = uniq(musicData.composers.map(c => c.epoch));
  const genres = uniq(musicData.works.map(w => w.genre));

  const options: Array<Filter> = [{ key: '_any', value: 'Anything' }];

  epochs.forEach(d => options.push({ value: d, key: 'epochs' }));
  genres.forEach(d => options.push({ value: d, key: 'genres' }));
  composers.forEach(d => options.push({ value: d, key: 'composers' }));
  
  return (
    <Autocomplete
      id="work-filter"
      sx={{ width: mq.mobile('100%', 250), flexGrow: 1 }}
      value={filter}
      onChange={(_: any, newValue: Filter | null) => {
        setFilter(newValue);
      }}
      isOptionEqualToValue={(o, f) => o.key === f.key}
      options={options}
      groupBy={(option) => option.key}
      getOptionLabel={(option) => option.value}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label="Show me..."
        />
      )}
    />
  );
};
