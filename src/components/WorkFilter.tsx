import { Autocomplete, TextField, Typography } from "@mui/material";
import { useMusicData } from "../state/useMusicData";
import { Filter, useWorkQueue } from "../state/useWorkQueue";
import { useWidth } from "../state/useWidth";
import { useState } from "react";

const uniq = (arr: Array<any>): Array<any> => {
  const nextArr: Array<any> = [];

  arr.forEach((v) => {
    if (nextArr.includes(v)) return;
    nextArr.push(v);
  });

  return nextArr;
};

const addLabels = (str: string, input: string) => {
  if (input.length === 0) return str;

  const r = new RegExp(input, "gi");

  const [match] = str.match(r) || [input];

  const highlightedString = str.replace(
    new RegExp(input, "gi"),
    `<span style="color: black; font-weight: bold;">${match}</span>`,
  );

  return <span dangerouslySetInnerHTML={{ __html: highlightedString }} />
};

const OptionLabel = (props: {
  option: Filter,
  input: string,
  parentProps: {},
}) => {
  const { option, input, parentProps } = props;

  if (!option?.value) return "";

  if (option?.key === "Works") {
    const [w, c] = option.value.split('__SPLIT__');
    return (
      <li {...parentProps} style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Typography variant="inherit" sx={{ width: '100%' }}>
          { addLabels(w, input) }
        </Typography>
        <Typography variant="inherit" sx={{ width: '100%' }} color="GrayText">
          { addLabels(c, input) }
        </Typography>
      </li>
    );
  }

  return (
    <li {...parentProps}>
      { addLabels(option?.value, input) }
    </li>
  )
};

export const WorkFilter = () => {
  // const mq = useWidth();
  const { filter, setFilter } = useWorkQueue();
  const musicData = useMusicData();
  const [input, setInput] = useState("");

  const composers = musicData.composers.map(c => c.complete_name);
  const epochs = uniq(musicData.composers.map(c => c.epoch));
  const genres = uniq(musicData.works.map(w => w.genre));
  const works = musicData.works.map(w => `${w.title}__SPLIT__${w.composer.complete_name}`);

  const options: Array<Filter> = [];

  epochs.forEach(d => options.push({ value: d, key: 'Epochs' }));
  genres.forEach(d => options.push({ value: d, key: 'Genres' }));
  composers.forEach(d => options.push({ value: d, key: 'Composers' }));
  if (input.length > 0) {
    works.forEach(d => options.push({ value: d, key: 'Works' }));
  }

  console.log(filter);
  
  return (
    <Autocomplete
      id="work-filter"
      // sx={{ width: mq.mobile('100%', 550), flexGrow: 1 }}
      sx={{ width: 550 }}
      value={filter}
      onChange={(_: any, newValue: Filter | null) => {
        setFilter(newValue);
      }}
      isOptionEqualToValue={(o, f) => {
        if (o === null || f === null) return false;
        return o.key === f.key;
      }}
      options={options}
      groupBy={(option) => {
        if (option === null) return "";
        return option.key;
      }}
      getOptionLabel={(option) => {
        if (option === null) return "";
        return option.value.replace(/__SPLIT__/g, ' - ');
      }}
      renderOption={(props, option) => {
        return <OptionLabel option={option} input={input} parentProps={props} />
      }}
      onInputChange={(_, newInputValue) => {
        setInput(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          // sx={{ border: 'none' }}
          {...params}
          variant="standard"
          placeholder="Playing all composers and works"
          InputProps={{
            style: {
              height: 35,
              fontSize: 16,
              // backgroundColor: 'white',
              // padding: 8,
              // border: 'none',
            },
            ...params.InputProps
          }}
          // InputLabelProps={{ style: { height: 0 } }}
          // sx={{ height: 60 }}
          // variant="filled"
          // label="Show me..."
        />
      )}
    />
  );
};
